export async function loadMarkdown(path: string): Promise<string> {
  const res = await fetch(path);
  if (!res.ok) return "Gagal load konten.";
  return await res.text();
}
