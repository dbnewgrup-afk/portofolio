// src/components/HologramPanel/ProjectDetail.tsx
import type { Project } from "./ProjectsPanel";

type Props = { project: Project; onBack: () => void };

export default function ProjectDetail({ project, onBack }: Props) {
  const icons = project.icons ?? [];
  const mainImage = project.image || icons[0] || "/icon/shop.svg";
  const extraIcons = icons.filter((i) => i !== mainImage);

  return (
    <div className="panel show">
      {/* Back */}
      <div className="mb-3">
        <button onClick={onBack} className="btn inline-flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
               className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span>Kembali</span>
        </button>
      </div>

      <h2 className="panel-title">{project.title}</h2>

      {/* Ikon stack */}
      {extraIcons.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3 items-center">
          {extraIcons.map((icon) => (
            <img
              key={icon}
              src={icon}
              alt=""
              className="w-10 h-10 aspect-square object-contain bg-white/[0.03] p-1 rounded-md"
              loading="lazy"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                if (el.dataset.fallback !== "1") {
                  el.dataset.fallback = "1";
                  el.src = "/icon/shop.svg";
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Deskripsi */}
      {project.summary && (
        <p className="mt-4 text-sm leading-relaxed opacity-90">{project.summary}</p>
      )}

 <div className="mt-6 grid place-items-center">
  <div className="thumb-wrap">
    <img
      src={mainImage}
      alt={`Tangkapan layar ${project.title}`}
      className="thumb-img rounded-md border border-white/10 p-2 object-contain"
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
</div>

    </div>
  );
}
