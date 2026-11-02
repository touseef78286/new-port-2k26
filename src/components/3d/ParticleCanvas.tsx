import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ParticleTheme } from '../../types';
import { generatePortraitPoints, loadTransparentPortrait } from './generators/portraitGenerator';
import { generateTextPoints } from './generators/textParticleGenerator';
import { generateNeuralMeshPoints } from './generators/neuralMeshGenerator';
import { particleVertexShader, particleFragmentShader } from './shaders/particleShaders';

interface ParticleCanvasProps {
  targetMorphProgress: number; // 0.0 to 4.0
  theme: ParticleTheme;
  density: 'ultra' | 'high' | 'balanced' | 'eco';
  dispersion: number;
  turbulence: number;
}

const _mouse = new THREE.Vector2(0, 0);
const _targetMouse = new THREE.Vector2(0, 0);

export function ParticleCanvas({
  targetMorphProgress,
  theme,
  density,
  dispersion,
  turbulence,
}: ParticleCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const targetProgressRef = useRef(targetMorphProgress);
  targetProgressRef.current = targetMorphProgress;

  const dispersionRef = useRef(dispersion);
  dispersionRef.current = dispersion;

  const turbulenceRef = useRef(turbulence);
  turbulenceRef.current = turbulence;

  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL Guard
    const isSoftwareGl = (() => {
      try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Renderer Setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
      premultipliedAlpha: false,
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 3. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030508, 0.03);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // 4. Particle Counts
    let particleCount = 22000;
    if (density === 'ultra') particleCount = 36000;
    else if (density === 'high') particleCount = 24000;
    else if (density === 'balanced') particleCount = 14000;
    else if (density === 'eco' || isSoftwareGl) particleCount = 7000;

    // 5. Generate Target Coordinate Buffers
    // In Stage 0, particles hover around the shoulders, collar, and hair crown matching the sparks in the photograph
    const isDesktop = width >= 1024;
    const portraitOffsetX = isDesktop ? 2.3 : 0.0;
    const portraitData = generatePortraitPoints(particleCount, portraitOffsetX);
    const posText1 = generateTextPoints('I BUILD INTELLIGENT SYSTEMS THAT SOLVE REAL PROBLEMS.', particleCount, {
      fontSize: 66,
      scale: 0.0068,
    });
    const posText2 = generateTextPoints('Software Engineering × AI × Automation', particleCount, {
      fontSize: 70,
      scale: 0.0072,
    });
    const posNeural = generateNeuralMeshPoints(particleCount);
    const posText3 = generateTextPoints("LET'S BUILD SOMETHING MEANINGFUL", particleCount, {
      fontSize: 68,
      scale: 0.007,
    });

    const posScatter = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const randomSeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      posScatter[idx] = (Math.random() - 0.5) * 16.0;
      posScatter[idx + 1] = (Math.random() - 0.5) * 12.0;
      posScatter[idx + 2] = (Math.random() - 0.5) * 12.0;

      sizes[i] = portraitData.sizes[i] || (0.6 + Math.random() * 0.8);
      randomSeeds[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(portraitData.positions, 3));
    geometry.setAttribute('aPositionPortrait', new THREE.BufferAttribute(portraitData.positions, 3));
    geometry.setAttribute('aColorPortrait', new THREE.BufferAttribute(portraitData.colors, 3));
    geometry.setAttribute('aPositionText1', new THREE.BufferAttribute(posText1, 3));
    geometry.setAttribute('aPositionText2', new THREE.BufferAttribute(posText2, 3));
    geometry.setAttribute('aPositionNeural', new THREE.BufferAttribute(posNeural, 3));
    geometry.setAttribute('aPositionText3', new THREE.BufferAttribute(posText3, 3));
    geometry.setAttribute('aRandomScatter', new THREE.BufferAttribute(posScatter, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aRandomSeed', new THREE.BufferAttribute(randomSeeds, 1));

    // Particle Shader Uniforms
    const particleUniforms = {
      uTime: { value: 0 },
      uMorphProgress: { value: 0.0 },
      uIntroProgress: { value: 0.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uDispersion: { value: dispersionRef.current },
      uTurbulence: { value: turbulenceRef.current },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uPrimaryColor: { value: new THREE.Color(themeRef.current.primaryColor) },
      uSecondaryColor: { value: new THREE.Color(themeRef.current.secondaryColor) },
    };

    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: particleUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // Asynchronously load the photographic image, apply the high-contrast alpha mask
    // (strictly excluding background) and 3x3 sharpening pass to preserve edge integrity at high resolutions
    let isDisposed = false;
    loadTransparentPortrait(
      '/assets/portrait_bust_transparent.png',
      particleCount,
      portraitOffsetX,
      ({ portraitData: loadedData }) => {
        if (isDisposed) return;
        const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
        const portAttr = geometry.getAttribute('aPositionPortrait') as THREE.BufferAttribute;
        const colorAttr = geometry.getAttribute('aColorPortrait') as THREE.BufferAttribute;
        const sizeAttr = geometry.getAttribute('aSize') as THREE.BufferAttribute;

        if (portAttr && loadedData.positions.length === portAttr.array.length) {
          portAttr.copyArray(loadedData.positions);
          portAttr.needsUpdate = true;
        }

        // If currently at hero stage, update current position buffer too
        if (posAttr && loadedData.positions.length === posAttr.array.length) {
          if (particleUniforms.uMorphProgress.value < 0.15) {
            posAttr.copyArray(loadedData.positions);
            posAttr.needsUpdate = true;
          }
        }

        if (colorAttr && loadedData.colors.length === colorAttr.array.length) {
          colorAttr.copyArray(loadedData.colors);
          colorAttr.needsUpdate = true;
        }

        if (sizeAttr && loadedData.sizes.length === sizeAttr.array.length) {
          sizeAttr.copyArray(loadedData.sizes);
          sizeAttr.needsUpdate = true;
        }
      }
    );

    // 6. Ambient Cosmic Dust Particles
    const dustCount = isSoftwareGl ? 350 : 800;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 24;
      dustPos[i + 1] = (Math.random() - 0.5) * 20;
      dustPos[i + 2] = (Math.random() - 0.5) * 18 - 2;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.045,
      color: themeRef.current.accentHex,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const dustField = new THREE.Points(dustGeo, dustMat);
    scene.add(dustField);

    // 7. Pointer Movement Handler
    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      _targetMouse.set(x, y);
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      if (w < 768) {
        camera.position.z = 10.2;
      } else {
        camera.position.z = 7.8;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      particleUniforms.uPixelRatio.value = renderer.getPixelRatio();
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // 9. Animation Loop
    let frameId = 0;
    const clock = new THREE.Clock();
    const introStartTime = performance.now();

    const tick = () => {
      frameId = requestAnimationFrame(tick);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth Intro Convergence (particles settle onto shoulders & hair)
      const introElapsed = (performance.now() - introStartTime) / 1000;
      const targetIntro = Math.min(1.0, introElapsed / 1.6);
      particleUniforms.uIntroProgress.value = THREE.MathUtils.damp(
        particleUniforms.uIntroProgress.value,
        targetIntro,
        3.5,
        delta
      );

      // Smooth Morph Interpolation (scroll or dock stage)
      particleUniforms.uMorphProgress.value = THREE.MathUtils.damp(
        particleUniforms.uMorphProgress.value,
        targetProgressRef.current,
        4.0,
        delta
      );

      // Smooth Mouse Interpolation
      _mouse.x = THREE.MathUtils.damp(_mouse.x, _targetMouse.x, 3.0, delta);
      _mouse.y = THREE.MathUtils.damp(_mouse.y, _targetMouse.y, 3.0, delta);
      particleUniforms.uMouse.value.copy(_mouse);

      // Dynamic Uniforms
      particleUniforms.uTime.value = elapsed;
      particleUniforms.uDispersion.value = dispersionRef.current;
      particleUniforms.uTurbulence.value = turbulenceRef.current;

      // Theme Colors
      particleUniforms.uPrimaryColor.value.lerp(new THREE.Color(themeRef.current.primaryColor), 0.08);
      particleUniforms.uSecondaryColor.value.lerp(new THREE.Color(themeRef.current.secondaryColor), 0.08);

      // Rotation
      particles.rotation.y = _mouse.x * 0.06;
      particles.rotation.x = -_mouse.y * 0.04;
      dustField.rotation.y = elapsed * 0.015;

      renderer.render(scene, camera);
    };

    tick();

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      particleMaterial.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [density]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(5,9,16,0.6) 0%, rgba(3,5,8,1) 85%)',
      }}
    />
  );
}
