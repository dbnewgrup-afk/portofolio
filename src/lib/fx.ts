// Simple sound helper. Pakai name biar TS nggak rewel.
const fxMap: Record<string, string> = {
  click: "/audio/click.mp3",
  start: "/audio/start.mp3"
};

export function playFx(name: string) {
  const url = fxMap[name];
  if (!url) return;
  const a = new Audio(url);
  a.volume = name === "start" ? 0.6 : 0.4;
  a.play().catch(() => {});
}
