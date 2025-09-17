// src/components/HologramPanel/HoloMenu.tsx
import { useCallback, useId } from "react";

export type Menu = "home" | "about" | "projects" | "skills" | "contact" | "collab";

type Props = {
  active: Menu;
  onChange: (next: Menu) => void;
  orientation?: "horizontal" | "vertical"; // default: horizontal
  labels?: Partial<Record<Menu, string>>;  // override label kalau perlu
};

const ORDER: Menu[] = ["home", "about", "projects", "skills", "contact", "collab"];
const DEFAULT_LABEL: Record<Menu, string> = {
  home: "Home",
  about: "About",
  projects: "Projects",
  skills: "Skills",
  contact: "Contact",
  collab: "Collab",
};

export default function HoloMenu({
  active,
  onChange,
  orientation = "horizontal",
  labels,
}: Props) {
  const navId = useId();
  const mergedLabel = { ...DEFAULT_LABEL, ...(labels ?? {}) };

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      const isH = orientation === "horizontal";
      const prevKey = isH ? "ArrowLeft" : "ArrowUp";
      const nextKey = isH ? "ArrowRight" : "ArrowDown";
      if (e.key !== prevKey && e.key !== nextKey) return;

      e.preventDefault();
      const idx = ORDER.indexOf(active);
      const next =
        e.key === nextKey
          ? ORDER[(idx + 1) % ORDER.length]
          : ORDER[(idx - 1 + ORDER.length) % ORDER.length];
      onChange(next);
    },
    [active, onChange, orientation]
  );

  return (
    <nav
      id={navId}
      className={["holo-menu", orientation === "vertical" ? "is-vertical" : ""].join(" ").trim()}
      role="tablist"
      aria-orientation={orientation}
      aria-label="Hologram menu"
      onKeyDown={handleKey}
    >
      {ORDER.map((m) => {
        const selected = active === m;
        return (
          <button
            key={m}
            role="tab"
            type="button"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            className={["holo-tab", selected ? "is-active" : ""].join(" ").trim()}
            onClick={() => onChange(m)}
            data-menu={m}
          >
            {mergedLabel[m]}
          </button>
        );
      })}
    </nav>
  );
}
