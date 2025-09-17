import { useCallback } from "react";

/**
 * Hook sederhana untuk mainin sound effect.
 * @param src path file audio (contoh: "/audio/click.mp3")
 * @param volume angka 0.0 - 1.0
 * @returns function untuk play sound
 */
export function useSound(src: string, volume = 1) {
  const play = useCallback(() => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(() => {
      // biar ga error kalau autoplay diblok browser
    });
  }, [src, volume]);

  return play;
}
