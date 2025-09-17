// src/components/ControllerView/ControllerSVG.tsx
import { useCallback } from "react";
import "./hologram.css";

export type SvgHotspot = {
  id: string;
  label: string;
  x: number;   // 0..1 relatif lebar
  y: number;   // 0..1 relatif tinggi
  r?: number;  // 0..1 relatif lebar (radius area klik)
  r2?: number; // 0..1 relatif lebar (radius ring visual)
  kind: "face" | "dpad";
};

type Props = {
  hotspots: SvgHotspot[];
  onHit: (id: string) => void;
  imageHref?: string;
  ariaLabel?: string;
};

const VB_W = 1000;
const VB_H = 620;

export default function ControllerSVG({
  hotspots,
  onHit,
  imageHref = "/images/controller-alpha.png",
  ariaLabel = "PlayStation 5 controller",
}: Props) {
  const handle = useCallback((id: string) => () => onHit(id), [onHit]);

  return (
    <div className="controller-wrap">
      <svg
        className="controller-svg"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        role="img"
        aria-label={ariaLabel}
      >
        <title>{ariaLabel}</title>

        <defs>
          <filter id="spotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Gambar controller di bawah, dimensi eksplisit untuk cegah CLS */}
        <image
          href={imageHref}
          x="0"
          y="0"
          width={VB_W}
          height={VB_H}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        />

        {/* Hotspots */}
        {hotspots.map(h => {
          const cx = h.x * VB_W;
          const cy = h.y * VB_H;
          const r  = (h.r  ?? 0.020) * VB_W; // 2% lebar → ~20px
          const r2 = (h.r2 ?? 0.030) * VB_W; // ring sedikit lebih besar

          return (
            <g
              key={h.id}
              className={`spot ${h.kind}`}
              onClick={handle(h.id)}
              tabIndex={0}
              role="button"
              aria-label={h.label}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onHit(h.id);
                }
              }}
            >
              {/* area klik (tak terlihat) */}
              <circle className="spot-hit" cx={cx} cy={cy} r={r} />

              {/* ring visual (hover/focus) */}
              <circle
                className="spot-ring"
                cx={cx}
                cy={cy}
                r={r2}
                filter="url(#spotGlow)"
                vectorEffect="non-scaling-stroke"
              />

              {/* debug titik pusat (hapus jika sudah pas)
              <circle cx={cx} cy={cy} r={3} fill="red" />
              */}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
