// src/components/UI/Drawer.tsx
import type { PanelKey } from "../HologramPanel/HologramPanel";

type Item = { key: PanelKey; label: string };

export function Drawer({
  items,
  current,
  onSelect,
}: {
  items: Item[];
  current: PanelKey;
  onSelect: (k: PanelKey) => void;
}) {
  return (
    <nav className="max-w-full overflow-x-auto no-scrollbar">
      <div className="flex gap-2">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => onSelect(it.key)}
            className={
              "px-3 py-2 text-sm rounded-lg whitespace-nowrap transition " +
              (current === it.key
                ? "bg-white/10 border border-white/15"
                : "hover:bg-white/10 border border-transparent")
            }
            aria-current={current === it.key ? "page" : undefined}
          >
            {it.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
