/**
 * Real-time background remover for the portrait image.
 * Keys out the pure black and dark background while perfectly preserving the
 * subject (face, hair, beard, skin tones, jacket, collar) and the radiant cyan particle flares.
 */

let cachedTransparentUrl: string | null = null;

export function getTransparentPortraitUrl(
  imageSrc: string,
  onComplete: (url: string) => void
) {
  if (cachedTransparentUrl) {
    onComplete(cachedTransparentUrl);
    return;
  }

  if (typeof window === 'undefined') {
    onComplete(imageSrc);
    return;
  }

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imageSrc;

  img.onload = () => {
    try {
      const canvas = document.createElement('canvas');
      const width = img.width || 1920;
      const height = img.height || 1080;
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        onComplete(imageSrc);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      const centerX = width * 0.49;
      const centerY = height * 0.45;
      const faceRadiusX = width * 0.22;
      const faceRadiusY = height * 0.38;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          // Normalized luminance
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          // Detect electric cyan sparks / aura (high blue & green relative to red)
          const isCyanSpark = b > 40 && g > 30 && b > r * 1.1;

          // Elliptical distance from head/chest center
          const dx = (x - centerX) / faceRadiusX;
          const dy = (y - centerY) / faceRadiusY;
          const distFromSubject = Math.sqrt(dx * dx + dy * dy);

          // High-contrast strict foreground mask
          if (isCyanSpark) {
            // Preserve electric cyan spark trails and aura flares
            data[idx + 3] = Math.min(255, Math.max(85, Math.round(b * 1.35)));
          } else if (distFromSubject < 1.02 && lum >= 20) {
            // Core foreground subject (head, face, beard, chest)
            data[idx + 3] = 255;
          } else if (distFromSubject < 1.25 && lum >= 32) {
            // Outer shoulders and coat lapels
            data[idx + 3] = 255;
          } else {
            // Strictly exclude background pixels
            data[idx + 3] = 0;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      const resultUrl = canvas.toDataURL('image/png');
      cachedTransparentUrl = resultUrl;
      onComplete(resultUrl);
    } catch {
      onComplete(imageSrc);
    }
  };

  img.onerror = () => {
    onComplete(imageSrc);
  };
}
