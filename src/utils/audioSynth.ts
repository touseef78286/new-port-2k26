/**
 * 100% Procedural Web Audio API soundscape synthesizer.
 * Generates an ambient low-frequency futuristic drone and soft glass harmonic chimes.
 * Zero external mp3 dependencies, lightweight and non-intrusive.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Low pass filter for warm cyber ambiance
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(320, this.ctx.currentTime);
      this.filter.connect(this.masterGain);

      // Warm twin drone oscillators
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note
      this.droneOsc1.connect(this.filter);
      this.droneOsc1.start();

      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(110.3, this.ctx.currentTime); // A2 slight detune
      this.droneOsc2.connect(this.filter);
      this.droneOsc2.start();
    } catch {
      // AudioContext not supported or restricted
    }
  }

  public toggleMute(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0.0 : 0.04;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.2);
    }
    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public playMorphChime(pitchMultiplier: number = 1.0) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();

      chimeOsc.type = 'sine';
      // Harmonic pentatonic pitch (e.g. 440, 554, 659, 880)
      const baseFreq = 440 * pitchMultiplier;
      chimeOsc.frequency.setValueAtTime(baseFreq, now);
      chimeOsc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.6);

      chimeGain.gain.setValueAtTime(0.04, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.masterGain);

      chimeOsc.start(now);
      chimeOsc.stop(now + 1.3);
    } catch {
      // Ignored
    }
  }
}

export const audioSynth = new AudioSynthesizer();
