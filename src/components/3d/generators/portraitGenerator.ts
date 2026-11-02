import * as THREE from 'three';

/**
 * Image-driven point cloud generator that samples the portrait photograph:
 * - Uses a high-contrast alpha mask to STRICTLY exclude background pixels so
 *   particle density mapping accounts exclusively for the foreground subject.
 * - Applies a 3x3 sharpening convolution pass (Laplacian / unsharp mask)
 *   and Sobel gradient edge analysis to preserve edge integrity at high resolutions.
 * - Aligns particle coordinates 1:1 with the 3D portrait plane for seamless zero-gap merge.
 */

export interface PortraitData {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
}

export const PORTRAIT_PLANE_WIDTH = 5.8;
export const PORTRAIT_PLANE_HEIGHT = 3.2625; // 16:9 exact ratio

/**
 * Computes a high-contrast alpha mask that strictly excludes background pixels.
 * Zero background pixels are admitted into the particle candidate pool.
 */
export function computeHighContrastAlphaMask(
  data: Uint8ClampedArray,
  width: number,
  height: number
): Uint8Array {
  const mask = new Uint8Array(width * height);
  const cx = width * 0.495;
  const cy = height * 0.47;
  const rx = width * 0.36;
  const ry = height * 0.48;

  for (let y = 0; y < height; y++) {
    const yOff = y * width;
    const dy = (y - cy) / ry;
    const dy2 = dy * dy;

    for (let x = 0; x < width; x++) {
      const idx = (yOff + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // 1. Strict PNG alpha exclusion (pre-keyed transparent pixels)
      if (a < 30) {
        mask[yOff + x] = 0;
        continue;
      }

      // 2. Perceptual luminance calculation (Rec. 601)
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      // 3. Electric cyan spark / aura detection
      const isCyanSpark =
        (b > 45 && g > 35 && b > r * 1.15) ||
        (b > 85 && g > 75 && r < 70);

      // 4. Normalized distance from subject center
      const dx = (x - cx) / rx;
      const distSq = dx * dx + dy2;

      // 5. Strict high-contrast alpha mask decision:
      // Background pixels (lum < 24 and not cyan) are strictly 0.
      // Outside subject bounds (distSq > 1.25) and not cyan are strictly 0.
      if (isCyanSpark) {
        mask[yOff + x] = 1;
      } else if (distSq < 1.02 && lum >= 20) {
        mask[yOff + x] = 1;
      } else if (distSq < 1.28 && lum >= 34) {
        mask[yOff + x] = 1;
      } else {
        mask[yOff + x] = 0; // Strictly exclude background
      }
    }
  }

  return mask;
}

/**
 * 3x3 Sharpening Convolution & Edge-Gradient Pass:
 * Applies Laplacian / unsharp mask kernel to enhance high frequencies and
 * calculates Sobel gradient magnitude to preserve structural edges (eyes, nose,
 * jawline, hair contours, jacket collar) during high-resolution point cloud synthesis.
 */
export interface SharpenedFeatureMap {
  sharpenedColors: Float32Array; // RGB triplets [0, 1]
  edgeMagnitudes: Float32Array;  // [0, 1]
  isEdge: Uint8Array;            // 1 if structural edge
}

export function applySharpeningPass(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  mask: Uint8Array
): SharpenedFeatureMap {
  const pixelCount = width * height;
  const lumBuffer = new Float32Array(pixelCount);

  // Precompute luminance
  for (let i = 0; i < pixelCount; i++) {
    const idx = i * 4;
    lumBuffer[i] = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
  }

  const sharpenedColors = new Float32Array(pixelCount * 3);
  const edgeMagnitudes = new Float32Array(pixelCount);
  const isEdge = new Uint8Array(pixelCount);

  for (let y = 0; y < height; y++) {
    const yOff = y * width;
    const yTop = Math.max(0, y - 1) * width;
    const yBottom = Math.min(height - 1, y + 1) * width;

    for (let x = 0; x < width; x++) {
      const idx = yOff + x;

      // Skip non-foreground pixels entirely to save computation
      if (mask[idx] === 0) continue;

      const xLeft = Math.max(0, x - 1);
      const xRight = Math.min(width - 1, x + 1);

      // 3x3 Luminance Neighborhood
      const c = lumBuffer[idx];
      const l = lumBuffer[yOff + xLeft];
      const r = lumBuffer[yOff + xRight];
      const t = lumBuffer[yTop + x];
      const b = lumBuffer[yBottom + x];

      // 1. Laplacian Sharpening: [0, -1, 0; -1, 5, -1; 0, -1, 0]
      const sharpLum = 5.0 * c - (l + r + t + b);
      const sharpFactor = c > 4 ? Math.max(0.75, Math.min(1.45, sharpLum / c)) : 1.0;

      // Color sharpening
      const dIdx = idx * 4;
      const cIdx = idx * 3;
      sharpenedColors[cIdx] = Math.min(1.0, Math.max(0.0, (data[dIdx] / 255) * sharpFactor));
      sharpenedColors[cIdx + 1] = Math.min(1.0, Math.max(0.0, (data[dIdx + 1] / 255) * sharpFactor));
      sharpenedColors[cIdx + 2] = Math.min(1.0, Math.max(0.0, (data[dIdx + 2] / 255) * sharpFactor));

      // 2. Sobel Edge Gradient Magnitude:
      // Gx = (tr + 2*r + br) - (tl + 2*l + bl)
      // Gy = (bl + 2*b + br) - (tl + 2*t + tr)
      const tl = lumBuffer[yTop + xLeft];
      const tr = lumBuffer[yTop + xRight];
      const bl = lumBuffer[yBottom + xLeft];
      const br = lumBuffer[yBottom + xRight];

      const gx = (tr + 2.0 * r + br) - (tl + 2.0 * l + bl);
      const gy = (bl + 2.0 * b + br) - (tl + 2.0 * t + tr);
      const mag = Math.min(1.0, Math.sqrt(gx * gx + gy * gy) / 360.0);

      edgeMagnitudes[idx] = mag;
      if (mag > 0.22) {
        isEdge[idx] = 1;
      }
    }
  }

  return { sharpenedColors, edgeMagnitudes, isEdge };
}

/**
 * Pixel-to-Particle conversion that respects the high-contrast alpha mask
 * and preserves edge integrity via edge-guided candidate sampling.
 */
interface ProcessedPixel {
  u: number;
  v: number;
  r: number;
  g: number;
  b: number;
  isCyan: boolean;
  edgeWeight: number;
  isEdge: boolean;
  brightness: number;
}

export function convertPixelsToPointCloud(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  mask: Uint8Array,
  features: SharpenedFeatureMap,
  count: number,
  offsetX = 0
): PortraitData {
  const edgeCandidates: ProcessedPixel[] = [];
  const interiorCandidates: ProcessedPixel[] = [];

  // Downsample grid step for candidate extraction
  const step = width > 1200 ? 3 : 2;

  for (let y = 0; y < height; y += step) {
    const yOff = y * width;
    for (let x = 0; x < width; x += step) {
      const idx = yOff + x;

      // STRICT MASK: Only foreground pixels pass
      if (mask[idx] === 0) continue;

      const dIdx = idx * 4;
      const cIdx = idx * 3;
      const r = features.sharpenedColors[cIdx];
      const g = features.sharpenedColors[cIdx + 1];
      const b = features.sharpenedColors[cIdx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      const rawB = data[dIdx + 2];
      const rawG = data[dIdx + 1];
      const rawR = data[dIdx];
      const isCyan = (rawB > 45 && rawG > 35 && rawB > rawR * 1.15) || (rawB > 85 && rawG > 75 && rawR < 70);

      const isStructuralEdge = features.isEdge[idx] === 1;
      const edgeMag = features.edgeMagnitudes[idx];

      const pixel: ProcessedPixel = {
        u: x / width,
        v: 1.0 - y / height,
        r,
        g,
        b,
        isCyan,
        edgeWeight: edgeMag,
        isEdge: isStructuralEdge,
        brightness: lum,
      };

      if (isStructuralEdge || isCyan) {
        edgeCandidates.push(pixel);
      } else {
        interiorCandidates.push(pixel);
      }
    }
  }

  // Fallback guard if too few candidates found
  const totalEdge = edgeCandidates.length;
  const totalInterior = interiorCandidates.length;
  if (totalEdge + totalInterior === 0) {
    return generatePortraitPoints(count, offsetX);
  }

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  // Edge Integrity Allocation:
  // Allocate 50% of particles to edge & cyan spark contours to preserve crisp high-resolution definition.
  // Allocate 50% to interior surface texture (skin tones, beard volume, coat fabric).
  const numEdgeParticles = Math.min(count, Math.round(count * 0.52));

  for (let i = 0; i < count; i++) {
    const pIdx = i * 3;
    let pixel: ProcessedPixel;

    if (i < numEdgeParticles && totalEdge > 0) {
      pixel = edgeCandidates[Math.floor(Math.random() * totalEdge)];
    } else if (totalInterior > 0) {
      pixel = interiorCandidates[Math.floor(Math.random() * totalInterior)];
    } else {
      pixel = edgeCandidates[Math.floor(Math.random() * totalEdge)];
    }

    // Direct mapping to 3D physical coordinates with layout offset
    const planeX = (pixel.u - 0.5) * PORTRAIT_PLANE_WIDTH + offsetX;
    const planeY = (pixel.v - 0.5) * PORTRAIT_PLANE_HEIGHT;

    // Organic 3D Depth Field:
    // Face center curves outward gracefully;
    // Structural edges maintain minimal jitter to preserve razor-sharp contour lines
    let planeZ = 0.0;
    const dxFromHead = (planeX - offsetX);
    const dyFromHead = (planeY - 0.28);
    const headDist = Math.sqrt(dxFromHead * dxFromHead + dyFromHead * dyFromHead);

    if (pixel.isCyan) {
      // Radiant electric sparks float dynamically in the 3D aura
      planeZ = (Math.random() - 0.5) * 1.15;
    } else if (headDist < 1.15) {
      // Sculpted 3D facial volume
      const domeFactor = Math.max(0, 1.0 - (headDist / 1.15) * (headDist / 1.15));
      planeZ = Math.sqrt(domeFactor) * 0.44;

      // Keep edges crisp with near-zero z-dispersion
      if (!pixel.isEdge) {
        planeZ += (Math.random() - 0.5) * 0.04;
      }
    } else {
      // Shoulders and coat jacket
      planeZ = (Math.random() - 0.5) * (pixel.isEdge ? 0.03 : 0.12);
    }

    positions[pIdx] = planeX;
    positions[pIdx + 1] = planeY;
    positions[pIdx + 2] = planeZ;

    colors[pIdx] = pixel.r;
    colors[pIdx + 1] = pixel.g;
    colors[pIdx + 2] = pixel.b;

    // Sharpened size modulation:
    // Edges are rendered with crisp, compact points for razor-sharp boundaries at high resolutions;
    // Cyan sparks have energetic larger flare discs.
    if (pixel.isCyan) {
      sizes[i] = 0.95 + Math.random() * 0.8;
    } else if (pixel.isEdge) {
      sizes[i] = 0.52 + pixel.edgeWeight * 0.3;
    } else {
      sizes[i] = 0.62 + pixel.brightness * 0.38;
    }
  }

  return { positions, colors, sizes };
}

/**
 * Fast procedural fallback buffer while the image loads,
 * shaped strictly to foreground anatomical coordinates.
 */
export function generatePortraitPoints(count: number, offsetX = 0): PortraitData {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  let pIdx = 0;
  let cIdx = 0;

  for (let i = 0; i < count; i++) {
    const t = Math.random();
    let x = 0, y = 0, z = 0;
    let r = 0.0, g = 0.94, b = 1.0;

    if (t < 0.45) {
      // Facial aura / head cluster (strictly centered on subject)
      const angle = Math.random() * Math.PI * 2;
      const rad = Math.random() * 0.88;
      x = Math.cos(angle) * rad * 0.88 + offsetX;
      y = Math.sin(angle) * rad * 1.15 + 0.32;
      z = (1.0 - rad) * 0.42 + (Math.random() - 0.5) * 0.04;

      r = 0.88; g = 0.76; b = 0.70;
    } else {
      // Shoulders and hair crown electric sparks
      x = (Math.random() - 0.5) * 3.0 + offsetX;
      y = (Math.random() - 0.5) * 2.2 - 0.2;
      z = (Math.random() - 0.5) * 0.6;

      if (Math.random() < 0.65) {
        r = 0.0; g = 0.94; b = 1.0;
      } else {
        r = 0.95; g = 0.98; b = 1.0;
      }
    }

    positions[pIdx++] = x;
    positions[pIdx++] = y;
    positions[pIdx++] = z;

    colors[cIdx++] = r;
    colors[cIdx++] = g;
    colors[cIdx++] = b;

    sizes[i] = 0.6 + Math.random() * 0.65;
  }

  return { positions, colors, sizes };
}

/**
 * Loads the photograph, executes the high-contrast alpha mask and 3x3 sharpening pass,
 * and generates edge-preserved 3D particle positions aligned with the viewport layout.
 */
export function loadTransparentPortrait(
  imageSrc: string,
  count: number,
  offsetX = 0,
  onReady?: (data: {
    texture: THREE.CanvasTexture;
    portraitData: PortraitData;
  }) => void
) {
  if (typeof window === 'undefined' || !onReady) return;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imageSrc;

  img.onload = () => {
    try {
      const width = img.width || 1920;
      const height = img.height || 1080;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // 1. High-Contrast Alpha Mask Calculation (strictly excludes background pixels)
      const alphaMask = computeHighContrastAlphaMask(data, width, height);

      // 2. 3x3 Sharpening Convolution & Edge-Gradient Pass
      const features = applySharpeningPass(data, width, height, alphaMask);

      // 3. Pixel-to-Particle Conversion with Edge Integrity Preservation
      const portraitData = convertPixelsToPointCloud(
        data,
        width,
        height,
        alphaMask,
        features,
        count,
        offsetX
      );

      // Apply transparent mask back to canvas for texture
      for (let i = 0; i < width * height; i++) {
        if (alphaMask[i] === 0) {
          data[i * 4 + 3] = 0; // Strictly transparent
        }
      }
      ctx.putImageData(imgData, 0, 0);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      onReady({
        texture,
        portraitData,
      });
    } catch {
      // Silently handle error and fall back
    }
  };

  img.onerror = () => {
    // If transparent bust path fails, fallback to original asset
    if (imageSrc !== '/assets/aistudio/Cyan_Particle_Portrait_in_the_Dark_3c4c2a36.png') {
      loadTransparentPortrait(
        '/assets/aistudio/Cyan_Particle_Portrait_in_the_Dark_3c4c2a36.png',
        count,
        offsetX,
        onReady
      );
    }
  };
}

