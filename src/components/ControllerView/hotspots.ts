// src/components/ControllerView/hotspots.ts
// Konsep baru: hanya 2 hotspot untuk toggle hologram.
// - ps-logo: tombol bulat logo PS (tengah bawah)
// - touch-trapezium: area touchpad/trapesium (atas logo)
// Koordinat dalam rasio viewBox (0..1). Nilai r bisa disetel lagi sesuai gambar.

const hotspots = [
  { id: "ps-logo",         label: "PS Logo Toggle",      x: 0.497, y: 0.465, r: 0.035, kind: "face" },
  { id: "touch-trapezium", label: "Touchpad Toggle",     x: 0.500, y: 0.270, r: 0.045, kind: "face" },
] as const;

export default hotspots;
export type HotspotId = typeof hotspots[number]["id"];
