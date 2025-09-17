// src/components/HologramPanel/ProjectsPanel.tsx
import raw from "../../data/projects.json";

export type RawProject = {
  id: string;
  title: string;
  image?: string;          // untuk ProjectDetail
  summary?: string;
  description?: string;
  demo?: string;
  link?: string;
  repo?: string;
  tags?: string[];
  icons?: string[];        // logo stack (React, Laravel, dst.)
  thumb?: string;          // OPTIONAL: ikon kategori untuk grid
};

export type Project = {
  id: string;
  title: string;
  image?: string;          // dipakai di ProjectDetail
  summary: string;
  url?: string;
  tags: string[];
  icons: string[];         // logo stack
  thumb?: string;          // ikon kategori untuk grid
};

type Props = { onSelect: (project: Project) => void };

const projects: Project[] = (raw as RawProject[]).map((p) => ({
  id: p.id,
  title: p.title,
  image: p.image,
  summary: p.summary ?? p.description ?? "",
  url: p.demo ?? p.link ?? p.repo ?? undefined,
  tags: p.tags ?? [],
  icons: p.icons ?? [],
  thumb: p.thumb, // kalau ada, dipakai untuk grid
}));

// Heuristik fallback kalau thumb tidak ada
function pickThumb(p: Project) {
  if (p.thumb) return p.thumb;

  const t = `${p.id} ${p.title}`.toLowerCase();
  if (/\brental|rent|mobil|car|vehicle\b/.test(t)) return "/icon/car.svg";
  if (/\brw\b|\bportal\b|komunitas|community/.test(t)) return "/icon/community.svg";
  // fallback umum
  return "/icon/shop.svg";
}

export default function ProjectsPanel({ onSelect }: Props) {
  return (
    <div className="panel show">
      <h2 className="panel-title">Proyek</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {projects.map((p) => {
          // PENTING: jangan pakai p.image atau p.icons[0] di grid!
          const iconSrc = pickThumb(p);

          const handleKey = (e: React.KeyboardEvent<HTMLElement>) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(p);
            }
          };

          return (
            <article
  key={p.id}
  tabIndex={0}
  role="button"
  aria-label={`Buka detail proyek ${p.title}`}
  onClick={() => onSelect(p)}
  onKeyDown={handleKey}
  className="cursor-pointer rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50"
>
  {/* Judul di atas */}
  <h3 className="text-base font-semibold">{p.title}</h3>

  {/* Logo BARIS SENDIRI */}
  <div className="mt-3">
    <img
      src={iconSrc}
      alt={`${p.title} thumb`}
      className="w-10 h-10 object-contain"
      loading="lazy"
      onError={(e) => {
        const el = e.currentTarget as HTMLImageElement;
        if (el.dataset.fallback !== "1") {
          el.dataset.fallback = "1";
          el.src = "/icon/shop.svg";
        }
      }}
    />
  </div>

  {/* Summary DI BAWAH LOGO */}
  {p.summary && (
    <p className="mt-3 text-sm opacity-80 leading-snug">
      {p.summary}
    </p>
  )}

  {/* Tags opsional */}
  {p.tags?.length > 0 && (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {p.tags.slice(0, 4).map((t) => (
        <span
          key={t}
          className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10"
        >
          {t}
        </span>
      ))}
    </div>
  )}
</article>


          );
        })}
      </div>
    </div>
  );
}
