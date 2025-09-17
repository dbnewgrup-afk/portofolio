// src/components/HologramPanel/HologramPanel.tsx
import { useCallback, useId, useMemo, useState } from "react";
import type React from "react";
import skillsData from "../../data/skills.json";
import ProjectsPanel from "./ProjectsPanel";
import type { Project } from "./ProjectsPanel";
import ProjectDetail from "./ProjectDetail";
import ContactPanel from "./ContactPanel";

/* ======================== Types ======================== */
export type Menu = "home" | "about" | "projects" | "skills" | "contact" | "collab";
export type PanelKey = Menu;

type Props = {
  title: string;
  subtitle: string;
  text?: string;          // markdown (about/contact/projects jika perlu)
  tall?: boolean;
  open?: boolean;
  active: Menu;
  onChange: (next: Menu) => void;
  onClose?: () => void;   // ← tambah ini
};

type SkillItem = {
  cat: "frontend" | "backend" | "db" | "tool" | "other";
  name: string;
  icon?: string;
};

/* ======================== Const ======================== */
const DURATION = 220;
const MENU_ORDER: Menu[] = ["home", "about", "projects", "skills", "contact", "collab"];
const MENU_LABEL: Record<Menu, string> = {
  home: "Home",
  about: "About",
  projects: "Projects",
  skills: "Skills",
  contact: "Contact",
  collab: "Collab",
};
const CAT_LABEL = {
  frontend: "Frontend",
  backend: "Backend",
  db: "Database",
  tool: "Tools",
  other: "Lainnya",
} as const;

/* ======================== Utils ======================== */
function publicUrl(p?: string) {
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) return p;
  let q = p.trim();
  q = q.replace(/^(\.\/|(\.\.\/))+/g, "");
  q = q.replace(/^public\//i, "");
  if (q.startsWith("/")) q = q.slice(1);
  q = q.replace(/^icon\//i, "");
  const base = (import.meta as any).env?.BASE_URL || "/";
  const baseNoSlash = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${baseNoSlash}/icon/${q}`;
}

const FALLBACK_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#80c8ff" stroke-width="1.6">
       <rect x="3" y="3" width="18" height="14" rx="2" ry="2" opacity=".25"/>
       <path d="M3 19h18" opacity=".45"/>
     </svg>`
  );

/* ---------- markdown ringan ---------- */
function mdToHtml(md: string): string {
  if (!md) return "";
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let listOpen = false;
  const flushList = () => {
    if (listOpen) {
      out.push("</ul>");
      listOpen = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushList();
      continue;
    }

    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      flushList();
      const tag = h[1].length === 1 ? "h2" : h[1].length === 2 ? "h3" : "h4";
      out.push(`<${tag}>${esc(h[2])}</${tag}>`);
      continue;
    }

    const li = line.match(/^[-*]\s+(.*)$/);
    if (li) {
      if (!listOpen) {
        out.push("<ul>");
        listOpen = true;
      }
      const item = esc(li[1])
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/`(.+?)`/g, "<code>$1</code>");
      out.push(`<li>${item}</li>`);
      continue;
    }

    const para = esc(line)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.+?)`/g, "<code>$1</code>");
    out.push(`<p>${para}</p>`);
  }

  flushList();
  return out.join("\n");
}

/* ======================== Subcomponents ======================== */
function SkillsGrid() {
  const items = (skillsData as SkillItem[]) || [];
  const groups = items.reduce<Record<SkillItem["cat"], SkillItem[]>>(
    (acc, it) => {
      const k = (it.cat || "other") as SkillItem["cat"];
      (acc[k] ||= []).push(it);
      return acc;
    },
    { frontend: [], backend: [], db: [], tool: [], other: [] }
  );

  return (
    <section className="skills">
      {Object.entries(groups).map(([cat, arr]) =>
        arr.length ? (
          <div key={cat} className="skills-section">
            <div className="skills-title">
              {CAT_LABEL[cat as keyof typeof CAT_LABEL]}
            </div>
            <ul className="skills-grid">
              {arr.map((it) => {
                const src = publicUrl(it.icon);
                return (
                  <li key={it.name} className="skill-card">
                    <img
                      src={src || FALLBACK_DATA_URI}
                      alt={it.name}
                      title={src}
                      className="skill-icon"
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        if (e.currentTarget.src !== FALLBACK_DATA_URI) {
                          console.warn("[skills icon missing]", it.name, "→", src);
                          e.currentTarget.src = FALLBACK_DATA_URI;
                        }
                      }}
                    />
                    <span className="skill-name">{it.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null
      )}
    </section>
  );
}

/* ---------- Home ---------- */
function HomeBlock() {
  return (
    <div className="space-y-3 text-sm leading-relaxed holo-text">
      <p>
        Halo, saya <strong>Muhammad Iqbal (DB Official)</strong>. Fokus saya di web
        development: bikin tampilan kece dan sistem yang jalan mulus di belakang layar.
      </p>
      <p>
        Pernah garap portal komunitas, platform rental mobil, sampai e-commerce. Buat saya,
        website itu alat kerja yang harus dipakai orang, bukan pajangan.
      </p>
    </div>
  );
}

/* ------------------ CollabBlock ------------------ */
function CollabBlock() {
  const RECIPIENT_EMAIL = "iqbalmubarok273@gmail.com";
  const WA_NUMBER = "628558067479";

  const enc = (s: string) => encodeURIComponent(s);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const brief = String(fd.get("brief") || "").trim();

    const subject = `Kolaborasi: ${name || "Project Inquiry"}`;
    const body =
      `Halo,\n\nSaya ${name || "-"} tertarik berkolaborasi.\n\n` +
      `Ringkasan:\n${brief || "-"}\n\nTerima kasih.`;

    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${enc(subject)}&body=${enc(body)}`;
  }

  function onWhatsApp() {
    const text =
      `Halo, saya tertarik kolaborasi.%0A%0A` +
      `Nama: %0A` +
      `Ringkasan proyek (target waktu & kisaran budget):`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  function onDirectEmail() {
    const subject = "Kolaborasi: Project Inquiry";
    const body =
      "Halo, saya tertarik kolaborasi.%0A%0A" +
      "Ringkasan proyek (target waktu & kisaran budget):";
    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="holo-text">
      <p className="panel-text" style={{ marginBottom: 12 }}>
        Tertarik bekerja sama? Silakan isi form berikut.
      </p>

      <form
        onSubmit={onSubmit}
        style={{
          display: "grid",
          gap: 12,
          background: "rgba(255,255,255,0.03)",
          borderRadius: 12,
          padding: 12,
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        <label style={{ display: "block" }}>
          <span style={{ fontSize: 12, opacity: 0.75 }}>Nama</span>
          <input
            name="name"
            type="text"
            placeholder="Nama kamu"
            autoComplete="name"
            style={inputStyle}
          />
        </label>

        <label style={{ display: "block" }}>
          <span style={{ fontSize: 12, opacity: 0.75 }}>Ringkasan</span>
          <textarea
            name="brief"
            placeholder="Ceritakan proyek, target waktu, dan kisaran budget..."
            rows={4}
            style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
          />
        </label>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 2 }}>
          <button type="submit" className="btn" style={btnPrimary}>
            Kirim
          </button>
          <button type="button" className="btn" style={btnGhost} onClick={onDirectEmail}>
            Langsung Email
          </button>
          <button type="button" className="btn" style={btnGhost} onClick={onWhatsApp}>
            WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
}

/* ------------------ tiny inline styles ------------------ */
const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 6,
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(8,20,40,0.6)",
  color: "white",
  outline: "none",
  boxShadow: "0 0 0 0 rgba(56,189,248,0)",
};

const btnPrimary: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  background: "rgba(56,189,248,0.2)",
  border: "1px solid rgba(56,189,248,0.35)",
  backdropFilter: "blur(2px)",
};

const btnGhost: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.10)",
};

/* ======================== Main ======================== */
export default function HologramPanel({
  title,
  subtitle,
  text,
  tall = true,
  open = true,
  active,
  onChange,
  onClose,
}: Props) {
  const titleId = useId();
  const subId = useId();
  const html = useMemo(() => (text ? mdToHtml(text) : ""), [text]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleArrowNav = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const idx = MENU_ORDER.indexOf(active);
      const next =
        e.key === "ArrowRight"
          ? MENU_ORDER[(idx + 1) % MENU_ORDER.length]
          : MENU_ORDER[(idx - 1 + MENU_ORDER.length) % MENU_ORDER.length];
      onChange(next);
    },
    [active, onChange, open]
  );

  const handlePanelKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
      }
    },
    [open, onClose]
  );

  return (
    <section
        className={[
    "holo",
    tall ? "holo-tall" : "",
    "holo-show",
    open ? "is-open" : "is-closed"
  ].join(" ")}
  role="region"
  aria-labelledby={titleId}
  aria-describedby={subId}
  data-open={open}
  data-anim-duration={DURATION}
  onKeyDown={handlePanelKey}
  tabIndex={-1} // supaya bisa terima keydown (Esc)
    >
      <div className="holo-border" />
      <div className="holo-content">
        <header className="holo-head" style={{ position: "relative" }}>
          <div id={titleId} className="holo-title">{title}</div>
          <div id={subId} className="holo-sub">{subtitle}</div>

          {onClose && open && (
            <button
              onClick={onClose}
              className="holo-close btn"
              aria-label="Close panel"
              title="Close (Esc)"
              style={{
                position: "absolute",
                right: 8,
                top: 8,
                width: 28,
                height: 28,
                display: "grid",
                placeItems: "center",
                borderRadius: 8,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {/* ikon X kecil */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="14"
                height="14"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </header>

        <nav
          className="holo-menu"
          role="tablist"
          aria-label="Hologram menu"
          aria-disabled={!open}
          onKeyDown={handleArrowNav}
        >
          {MENU_ORDER.map((m) => {
            const selected = active === m;
            return (
              <button
                key={m}
                role="tab"
                aria-selected={selected}
                tabIndex={!open ? -1 : selected ? 0 : -1}
                className={["holo-tab", selected ? "is-active" : ""].join(" ")}
                onClick={() => open && onChange(m)}
                disabled={!open}
                data-menu={m}
              >
                {MENU_LABEL[m]}
              </button>
            );
          })}
        </nav>

        <div className="holo-body" aria-hidden={!open}>
          {!open ? null : active === "skills" ? (
            <SkillsGrid />
          ) : active === "projects" ? (
            selectedProject ? (
              <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />
            ) : (
              <ProjectsPanel onSelect={setSelectedProject} />
            )
          ) : active === "contact" ? (
            <ContactPanel />
          ) : active === "collab" ? (
            <CollabBlock />
          ) : active === "home" ? (
            <HomeBlock />
          ) : html ? (
            <div className="holo-text" dangerouslySetInnerHTML={{ __html: html }} />
          ) : null}
        </div>

        {!open && (
          <div className="holo-closed-overlay" aria-live="polite">
            <span className="holo-closed-text">PLEASE PRESS START BUTTON</span>
          </div>
        )}
      </div>
    </section>
  );
}
