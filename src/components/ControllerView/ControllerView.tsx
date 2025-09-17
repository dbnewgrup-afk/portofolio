// src/components/ControllerView/ControllerView.tsx
import { useCallback } from "react";
import ControllerSVG, { type SvgHotspot } from "./ControllerSVG";

type Props = {
  onToggle: () => void;
  imageHref?: string;
  ariaLabel?: string;
  className?: string; // <-- penting buat override
};

const toggleHotspots: SvgHotspot[] = [
  { id: "ps-logo", x: 0.497, y: 0.465, r: 0.035, label: "PS Logo Toggle", kind: "face" },
  { id: "touch-trapezium", x: 0.500, y: 0.270, r: 0.045, label: "Touchpad Toggle", kind: "face" },
];

export default function ControllerView({ onToggle, imageHref, ariaLabel, className = "" }: Props) {
  const onHit = useCallback((id: string) => {
    if (id === "ps-logo" || id === "touch-trapezium") onToggle();
  }, [onToggle]);

  return (
    <div className={`controller-view ${className}`} role="region" aria-label="PS5 controller area">
      <ControllerSVG
        hotspots={toggleHotspots}
        onHit={onHit}
        imageHref={imageHref ?? "/images/controller-alpha.png"}
        ariaLabel={ariaLabel ?? "PS5 controller — press PS logo or touchpad to toggle hologram"}
      />
    </div>
  );
}
