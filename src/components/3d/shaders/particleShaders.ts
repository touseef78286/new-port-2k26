/**
 * Custom GLSL Shaders for the Cinematic Morphing Particle System
 * Supports multi-target state interpolation, photo color fidelity,
 * curl dispersion, mouse repulsion, and glowing point discs.
 */

export const particleVertexShader = `
  uniform float uTime;
  uniform float uMorphProgress;    // 0.0 (Portrait) -> 1.0 (Text 1) -> 2.0 (Text 2) -> 3.0 (Neural) -> 4.0 (Text 3)
  uniform float uIntroProgress;    // 0.0 (Scattered) -> 1.0 (Converged)
  uniform vec2 uMouse;             // Normalized mouse coordinates (-1 to 1)
  uniform float uDispersion;       // Dispersion multiplier
  uniform float uTurbulence;       // Noise turbulence factor
  uniform float uPixelRatio;

  attribute vec3 aPositionPortrait;
  attribute vec3 aColorPortrait;
  attribute vec3 aPositionText1;
  attribute vec3 aPositionText2;
  attribute vec3 aPositionNeural;
  attribute vec3 aPositionText3;
  attribute vec3 aRandomScatter;
  attribute float aSize;
  attribute float aRandomSeed;

  varying vec3 vPortraitColor;
  varying float vAlpha;
  varying float vDistToCenter;
  varying float vMorphProgress;

  vec3 getTargetPos(float progress) {
    vec3 p0 = aPositionPortrait;
    vec3 p1 = aPositionText1;
    vec3 p2 = aPositionText2;
    vec3 p3 = aPositionNeural;
    vec3 p4 = aPositionText3;

    if (progress <= 1.0) {
      float t = smoothstep(0.0, 1.0, progress);
      return mix(p0, p1, t);
    } else if (progress <= 2.0) {
      float t = smoothstep(0.0, 1.0, progress - 1.0);
      return mix(p1, p2, t);
    } else if (progress <= 3.0) {
      float t = smoothstep(0.0, 1.0, progress - 2.0);
      return mix(p2, p3, t);
    } else {
      float t = smoothstep(0.0, 1.0, progress - 3.0);
      return mix(p3, p4, t);
    }
  }

  void main() {
    // Pass portrait native color and current morph stage
    vPortraitColor = aColorPortrait;
    vMorphProgress = uMorphProgress;

    // 1. Compute base target position along the morph continuum
    vec3 targetPos = getTargetPos(clamp(uMorphProgress, 0.0, 4.0));

    // 2. Initial load converge from scattered ambient space
    vec3 basePos = mix(aRandomScatter, targetPos, smoothstep(0.0, 1.0, uIntroProgress));

    // 3. Morph transition curl & flight turbulence
    float transitionFactor = sin(fract(uMorphProgress) * 3.14159265);
    float energy = transitionFactor * uDispersion;

    // Organic harmonic wave motion (subtle breathing & hair flutter)
    float waveX = sin(uTime * 1.5 + basePos.y * 3.0 + aRandomSeed * 6.28) * 0.035;
    float waveY = cos(uTime * 1.2 + basePos.x * 2.5 + aRandomSeed * 6.28) * 0.025;
    float waveZ = sin(uTime * 0.9 + basePos.z * 2.0 + aRandomSeed * 3.14) * 0.035;

    vec3 pos = basePos + vec3(waveX, waveY, waveZ);

    // Apply turbulence during transition flight
    if (energy > 0.01) {
      float noiseAngle = aRandomSeed * 6.28318 + uTime * 2.0;
      vec3 flightDrift = vec3(
        cos(noiseAngle),
        sin(noiseAngle * 1.4),
        sin(noiseAngle * 0.7)
      ) * energy * (0.8 + uTurbulence * 0.8);
      pos += flightDrift;
    }

    // 4. Subtle mouse repulsion & parallax interaction
    vec2 screenOffset = pos.xy - uMouse * vec2(2.5, 2.0);
    float mouseDist = length(screenOffset);
    if (mouseDist < 2.2) {
      float repel = (1.0 - mouseDist / 2.2) * 0.4;
      pos.xy += normalize(screenOffset) * repel;
      pos.z += repel * 0.5;
    }

    // Parallax tilt from mouse
    pos.x += uMouse.x * 0.25;
    pos.y += uMouse.y * 0.2;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // 5. Dynamic particle sizing with perspective attenuation
    float baseSize = aSize * (34.0 * uPixelRatio);
    baseSize *= (1.0 + transitionFactor * 0.5);
    gl_PointSize = clamp(baseSize / -mvPosition.z, 1.5, 52.0);

    vDistToCenter = length(pos.xy);
    vAlpha = smoothstep(0.0, 0.4, uIntroProgress);
  }
`;

export const particleFragmentShader = `
  uniform vec3 uPrimaryColor;    // e.g. Electric Cyan #00f0ff
  uniform vec3 uSecondaryColor;  // e.g. Bright Sky #38bdf8
  uniform float uTime;

  varying vec3 vPortraitColor;
  varying float vAlpha;
  varying float vDistToCenter;
  varying float vMorphProgress;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);

    if (dist > 0.5) {
      discard;
    }

    // Soft radial glow gradient
    float intensity = exp(-dist * 5.2);
    float core = smoothstep(0.18, 0.0, dist);

    // Dynamic color:
    // In Stage 0 (Portrait), blend image colors (skin tones, warm eyes, beard, textured hair, collar sparks)
    // with glowing electric cyan aura!
    // As it morphs into Typography & Neural stages (progress > 0), blend smoothly into theme colors.
    float textThemeBlend = smoothstep(0.05, 0.85, vMorphProgress);
    
    // Base portrait color with glow
    vec3 portraitShaded = mix(vPortraitColor, vec3(1.0, 1.0, 1.0), core * 0.4);
    // Add slight cyan edge glow to portrait points
    portraitShaded = mix(portraitShaded, uPrimaryColor, 0.2);

    // Text & Neural color (theme based)
    vec3 themeColor = mix(uPrimaryColor, vec3(1.0, 1.0, 1.0), core * 0.85);
    themeColor = mix(themeColor, uSecondaryColor, smoothstep(0.1, 0.45, dist) * 0.5);

    vec3 finalColor = mix(portraitShaded, themeColor, textThemeBlend);

    float finalAlpha = intensity * vAlpha;
    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;
