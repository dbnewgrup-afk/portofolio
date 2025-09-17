// src/hooks/usePreload.ts
import { useEffect, useRef, useState } from "react";

interface UsePreloadOptions {
  images?: string[];
  texts?: string[];
  durationMs?: number;   // durasi minimal 0→100
  capBeforeDone?: number; // tidak dipakai lagi untuk loncatan
}

export function usePreload({
  images = [],
  texts = [],
  durationMs = 10000,
}: UsePreloadOptions) {
  const [progress, setProgress] = useState(0);
  const [assetsDone, setAssetsDone] = useState(false);
  const [done, setDone] = useState(false);

  const startRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let loaded = 0;
    const total = Math.max(1, images.length + texts.length);

    const bump = () => {
      loaded++;
      if (loaded >= total) setAssetsDone(true);
    };

    images.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = bump;
      img.src = src;
    });

    texts.forEach((url) => {
      fetch(url).then(r => r.text()).catch(() => "").finally(bump);
    });

    startRef.current = performance.now();

    const tick = () => {
      const now = performance.now();
      const elapsed = now - startRef.current;
      const timeRatio = Math.min(1, elapsed / durationMs);

      // progress murni berdasarkan waktu (ease-out lembut)
      const timeBased = Math.floor(100 * (1 - Math.pow(1 - timeRatio, 2)));

      // SELAMA durasi belum selesai, jangan pernah melewati timeBased
      setProgress((p) => (timeBased > p ? timeBased : p));

      if (timeRatio >= 1) {
        // Durasi minimal selesai: kalau aset siap → 100, kalau belum → naik pelan ke 95 sambil nunggu
        setProgress((p) => {
          const target = assetsDone ? 100 : Math.max(95, p);
          return p >= target ? p : p + 1;
        });

        if ((assetsDone && progress >= 100) || (!assetsDone && progress >= 95)) {
          // stop ketika sudah mencapai target
          return;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.join("|"), texts.join("|"), durationMs]);

  useEffect(() => {
    if (progress >= 100 && !done) setDone(true);
  }, [progress, done]);

  return { progress, done };
}
