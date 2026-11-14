const STORAGE_PREFIX = 'poket-pemandu-labuan:img:';

export type LocationImagesMap = Record<string, string>;

export function loadSavedImages(locationIds: string[]): LocationImagesMap {
  const result: LocationImagesMap = {};
  if (typeof window === 'undefined') return result;

  for (const id of locationIds) {
    try {
      const value = window.localStorage.getItem(`${STORAGE_PREFIX}${id}`);
      if (value) {
        result[id] = value;
      }
    } catch {
      // Ignore storage access errors
    }
  }
  return result;
}

export function saveLocationImage(locationId: string, dataUrl: string): boolean {
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${locationId}`, dataUrl);
    return true;
  } catch {
    return false;
  }
}

export function removeLocationImage(locationId: string): void {
  try {
    window.localStorage.removeItem(`${STORAGE_PREFIX}${locationId}`);
  } catch {
    // Ignore storage access errors
  }
}

export function resizeImageFile(file: File, maxDimension = 1200): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca fail gambar.'));
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        reject(new Error('Format gambar tidak sah.'));
        return;
      }

      const img = new Image();
      img.onerror = () => reject(new Error('Gambar tidak dapat dimuatkan.'));
      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(result);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  });
}
