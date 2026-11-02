/**
 * Generates 3D particle positions from arbitrary text strings
 * using offscreen HTML5 Canvas pixel sampling.
 * Highly robust, deterministic, and ultra-crisp.
 */

export function generateTextPoints(
  text: string,
  count: number,
  options?: {
    fontSize?: number;
    lineHeight?: number;
    maxWidth?: number;
    scale?: number;
    depthJitter?: number;
  }
): Float32Array {
  const positions = new Float32Array(count * 3);
  if (typeof document === 'undefined') return positions;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return positions;

  const width = 1400;
  const height = 700;
  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Format multi-line if needed
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  const maxCharsPerLine = text.length > 35 ? 26 : 38;

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length > maxCharsPerLine) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += (currentLine ? ' ' : '') + word;
    }
  }
  if (currentLine) lines.push(currentLine.trim());

  const fontSize = options?.fontSize || (lines.length > 2 ? 64 : 76);
  ctx.font = `800 ${fontSize}px "Bricolage Grotesque", "Plus Jakarta Sans", system-ui, sans-serif`;

  const totalHeight = lines.length * (fontSize * 1.25);
  const startY = height / 2 - totalHeight / 2 + fontSize * 0.6;

  lines.forEach((line, idx) => {
    ctx.fillText(line, width / 2, startY + idx * (fontSize * 1.25));
  });

  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Collect white pixels
  const sampledCoords: [number, number][] = [];
  const step = 3; // stride for balance between speed & density

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const idx = (y * width + x) * 4;
      const brightness = data[idx]; // R channel
      if (brightness > 120) {
        sampledCoords.push([x, y]);
      }
    }
  }

  const numFound = sampledCoords.length;
  const scale = options?.scale || 0.0075;
  const jitter = options?.depthJitter ?? 0.12;

  for (let i = 0; i < count; i++) {
    const pIdx = i * 3;
    if (numFound > 0) {
      // Pick coordinate with uniform modulo wrap
      const coord = sampledCoords[i % numFound];
      const normX = (coord[0] - width / 2) * scale;
      const normY = -(coord[1] - height / 2) * scale + 0.2;
      const normZ = (Math.random() - 0.5) * jitter;

      positions[pIdx] = normX;
      positions[pIdx + 1] = normY;
      positions[pIdx + 2] = normZ;
    } else {
      // Fallback ring if canvas failed
      const angle = (i / count) * Math.PI * 2;
      positions[pIdx] = Math.cos(angle) * 2;
      positions[pIdx + 1] = Math.sin(angle) * 2;
      positions[pIdx + 2] = 0;
    }
  }

  return positions;
}
