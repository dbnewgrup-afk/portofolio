// src/components/UI/Icon.tsx
import React from "react";

type SizeToken = "xs" | "sm" | "md" | "lg" | "xl";

type Props = {
  src: string;
  alt?: string;                 // jika decorative=true, alt akan diabaikan
  title?: string;
  size?: number | SizeToken;    // px atau token: xs=16, sm=20, md=40, lg=56, xl=72
  className?: string;
  decorative?: boolean;         // true = aria-hidden, alt kosong
  loading?: "lazy" | "eager";
  fallbackSrc?: string;         // default: /icon/power.svg
  rounded?: boolean;            // true = bentuk lingkaran
  onClick?: React.MouseEventHandler<HTMLImageElement>;
};

const SIZE_MAP: Record<SizeToken, number> = {
  xs: 16,
  sm: 20,
  md: 40, // default selaras dengan .skill-icon
  lg: 56,
  xl: 72,
};

export default function Icon({
  src,
  alt,
  title,
  size = "md",
  className = "",
  decorative = false,
  loading = "lazy",
  fallbackSrc = "/icon/power.svg",
  rounded = false,
  onClick,
}: Props) {
  const px = typeof size === "number" ? size : SIZE_MAP[size] ?? SIZE_MAP.md;

  // Hindari loop fallback
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.dataset.fallback !== "1") {
      img.src = fallbackSrc;
      img.dataset.fallback = "1";
    }
  };

  return (
    <img
      src={src}
      title={title || (!decorative ? alt : undefined)}
      alt={decorative ? "" : alt || ""}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      width={px}
      height={px}
      loading={loading}
      onError={handleError}
      onClick={onClick}
      className={[
        "icon",
        rounded ? "icon-rounded" : "",
        className,
      ].join(" ").trim()}
      style={{
        display: "inline-block",
        width: px,
        height: px,
        objectFit: "contain",
        borderRadius: rounded ? "9999px" : undefined,
      }}
    />
  );
}

/* Tips penggunaan:
   <Icon src="/icon/react.svg" alt="React" size="md" />
   <Icon src="/icon/github.svg" decorative size={20} className="opacity-80" />
   <Icon src="/icon/avatar.png" alt="Avatar" rounded size={56} />
*/
