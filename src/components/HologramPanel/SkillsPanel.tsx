// src/components/HologramPanel/SkillsPanel.tsx
// Versi baru: grid ikon per kategori (frontend/backend/db/tools/other)
// Sumber data dari src/data/skills.json (butuh tsconfig: "resolveJsonModule": true)
import { Fragment, useMemo } from "react";
import skillsData from "../../data/skills.json";

type SkillItem = {
  cat: "frontend" | "backend" | "db" | "tool" | "other";
  name: string;
  icon: string; // contoh: "/icon/react.svg"
};

const CAT_ORDER: SkillItem["cat"][] = ["frontend", "backend", "db", "tool", "other"];
const CAT_LABEL: Record<SkillItem["cat"], string> = {
  frontend: "Frontend",
  backend: "Backend",
  db: "Database",
  tool: "Tools",
  other: "Lainnya",
};

export default function SkillsPanel() {
  const grouped = useMemo(() => {
    const list = (skillsData as SkillItem[]).filter(Boolean);
    const byCat = new Map<SkillItem["cat"], SkillItem[]>();
    for (const it of list) {
      const arr = byCat.get(it.cat) ?? [];
      arr.push(it);
      byCat.set(it.cat, arr);
    }
    return byCat;
  }, []);

  return (
    <div className="skills">
      {CAT_ORDER.map((cat) => {
        const items = grouped.get(cat);
        if (!items || items.length === 0) return <Fragment key={cat} />;
        return (
          <section key={cat} className="skills-section" aria-label={CAT_LABEL[cat]}>
            <h3 className="skills-title">{CAT_LABEL[cat]}</h3>
            <ul className="skills-grid" role="list">
              {items.map((item) => (
                <li key={item.name} className="skill-card" title={item.name}>
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="skill-icon"
                    width={40}
                    height={40}
                    loading="lazy"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      if (el.dataset.fallback !== "1") {
                        el.src = "/icon/power.svg"; // fallback sederhana
                        el.dataset.fallback = "1";
                      }
                    }}
                  />
                  <span className="skill-name">{item.name}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
