// src/components/HologramPanel/ContactPanel.tsx
// Kontak dengan ikon + label dan peta lokasi (embed + fallback link)

export default function ContactPanel() {
  const LINKS = [
    { name: "GitHub",   href: "https://github.com/dbnewgrup-afk",                      icon: "/icon/github.svg" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-iqbal-3937a9223/", icon: "/icon/linkedin.svg" },
    { name: "Instagram",href: "https://www.instagram.com/mubarok_bal",                 icon: "/icon/instagram.svg" },
    { name: "WhatsApp", href: "https://wa.me/628558067479",                            icon: "/icon/whatsapp.svg" },
  ] as const;

  const mapsShare = "https://maps.app.goo.gl/AsMEUejAVLjwYxUt8";
  // Embed yang pasti jalan tanpa API key. Ganti "Bogor" dengan alamat/koordinat kalau mau lebih presisi.
  const mapsEmbed = "https://www.google.com/maps?q=-6.4536992,106.7929727&output=embed";

  return (
    <div className="holo-text">
      <h2 className="panel-title" style={{ marginBottom: 8 }}>Kontak</h2>
      <p className="panel-text" style={{ marginBottom: 12 }}>
      </p>

      {/* Grid ikon + label */}
      <ul
        aria-label="Social links"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 16,
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {LINKS.map(({ name, href, icon }) => (
          <li key={name} style={{ display: "flex", justifyContent: "center" }}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 60,
                  height: 60,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.06) inset",
                  transition: "transform .15s ease, box-shadow .15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.transform = "scale(1.06)";
                  (e.currentTarget as HTMLSpanElement).style.boxShadow =
                    "0 0 18px rgba(56,189,248,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.transform = "none";
                  (e.currentTarget as HTMLSpanElement).style.boxShadow =
                    "0 0 0 1px rgba(255,255,255,0.06) inset";
                }}
              >
                <img src={icon} alt={name} width={28} height={28} />
              </span>
              <span style={{ fontSize: 12, opacity: 0.9 }}>{name}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Peta lokasi */}
      <div style={{ marginTop: 20 }}>
        <h3 className="panel-title" style={{ fontSize: 16, marginBottom: 8 }}>Lokasi</h3>
        <div
          style={{
            width: "100%",
            maxWidth: 500,       // biar proporsional seperti panel
            height: 240,         // persegi panjang ringkas
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06) inset",
            margin: "0 auto",    // center
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <iframe
            title="Lokasi — Google Maps"
            src={mapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <p className="panel-text" style={{ marginTop: 8, textAlign: "center" }}>
          <a href={mapsShare} target="_blank" rel="noopener noreferrer" className="link">
            Buka di Google Maps
          </a>
        </p>
      </div>
    </div>
  );
}
