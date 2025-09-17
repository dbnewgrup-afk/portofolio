// src/App.tsx
import { useEffect, useMemo, useState, useCallback } from "react";
import ControllerView from "./components/ControllerView/ControllerView";
import HologramPanel from "./components/HologramPanel/HologramPanel";
import LoadingOverlay from "./components/LoadingOverlay";
import LogoTransition from "./components/LogoTransition";
import { useSound } from "./hooks/useSound";

import "./components/ControllerView/hologram.css";
import "./app.css";

type Menu = "home" | "about" | "projects" | "skills" | "contact" | "collab";
type Stage = "loading" | "logo" | "start" | "app";

/* ---------- constants ---------- */
const LOADING_DELAY = 300;

/* ---------- markdown cache ---------- */
const mdCache = new Map<string, string>();
async function loadMarkdown(path: string) {
  if (mdCache.has(path)) return mdCache.get(path)!;
  const res = await fetch(path);
  if (!res.ok) throw new Error("fetch gagal " + path);
  const txt = await res.text();
  mdCache.set(path, txt);
  return txt;
}

/* ---------- meta judul/subjudul ---------- */
const META: Record<Menu, { title: string; subtitle: string }> = {
  home:    { title: "DB Official",    subtitle: "Web Development" },
  about:   { title: "Profil",         subtitle: "Tentang Saya" },
  projects:{ title: "Proyek",         subtitle: "Karya Terpilih" },
  skills:  { title: "Kemampuan",      subtitle: "Frontend • Backend • Tools" },
  contact: { title: "Kontak",         subtitle: "Hubungi" },
  collab:  { title: "Collab with Me", subtitle: "Ayo bangun sesuatu" },
};

//* ---------- StartScreen ---------- */
function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="start-screen">
      <p className="start-text">PLEASE PRESS START BUTTON</p>
      {/* className penting supaya bisa dioverride */}
      <ControllerView onToggle={onStart} className="static-center" />
    </div>
  );
}


export default function App() {
  const [stage, setStage] = useState<Stage>("loading");
  const [holoOn, setHoloOn] = useState(true);
  const [active, setActive] = useState<Menu>("home");
  const [panelText, setPanelText] = useState("");
  const [loadingText, setLoadingText] = useState(false);

  const clickSound = useSound("/audio/click.mp3", 0.6);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  const filePath = useMemo(() => {
    switch (active) {
      case "about":    return "/content/about.md";
      case "contact":  return "/content/contact.md";
      case "projects": return "/content/projects/proj-1.md";
      default:         return "";
    }
  }, [active]);

  useEffect(() => {
    if (!filePath) {
      setLoadingText(false);
      setPanelText(
        active === "skills"
          ? "Kemampuan ditampilkan sebagai grid ikon di panel."
          : active === "collab"
          ? "Tertarik kerja bareng? Yuk diskusi."
          : ""
      );
      return;
    }

    const delay = window.setTimeout(() => setLoadingText(true), LOADING_DELAY);

    loadMarkdown(filePath)
      .then(setPanelText)
      .catch(() => setPanelText("Konten sementara tidak tersedia."))
      .finally(() => {
        window.clearTimeout(delay);
        setLoadingText(false);
      });

    return () => window.clearTimeout(delay);
  }, [active, filePath]);

  const handleToggle = useCallback(() => {
    clickSound();
    setHoloOn(v => !v);
  }, [clickSound]);

  const handleChangeMenu = useCallback((next: Menu) => {
    if (next === active) return;
    clickSound();
    setActive(next);
  }, [active, clickSound]);

  return (
    <div>
      {stage === "loading" && (
        <LoadingOverlay onFinish={() => setStage("logo")} />
      )}

      {stage === "logo" && (
        <LogoTransition onFinish={() => setStage("start")} />
      )}

      {stage === "start" && (
        <StartScreen onStart={() => setStage("app")} />
      )}

      {stage === "app" && (
        <main className="hero">
          <div className="hero-inner">
            <HologramPanel
              tall
              open={holoOn}
              active={active}
              onChange={handleChangeMenu}
              onClose={() => setHoloOn(false)} // <— ini
              title={META[active].title}
              subtitle={META[active].subtitle}
              text={loadingText ? "Memuat..." : panelText}
            />
            <ControllerView onToggle={handleToggle} />
          </div>
          <footer className="footer">
            <span>© {new Date().getFullYear()} DB Official</span>
          </footer>
        </main>
      )}
    </div>
  );
}
