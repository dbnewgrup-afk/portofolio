// src/components/HologramPanel/HoloContent.tsx
import type { Menu } from "./HoloMenu";
import SkillsPanel from "./SkillsPanel";
import ProjectsPanel from "./ProjectsPanel";
import ContactPanel from "./ContactPanel";

type Props = {
  active: Menu;
  text?: string; // fallback dari App (untuk about/projects/contact)
};

export default function HoloContent({ active, text }: Props) {
  switch (active) {
    case "home":
      return <HomeBlock />;

    case "skills":
      return <SkillsPanel />;

    case "projects":
      return <ProjectsPanel />;

    case "contact":
      return <ContactPanel />;

    case "collab":
      return <CollabBlock />;

    // about → masih pakai markdown fallback
    default:
      return text ? <div className="holo-text">{text}</div> : null;
  }
}

/* ---------- Home ---------- */
function HomeBlock() {
  return (
    <div className="space-y-3 text-sm leading-relaxed holo-text">
      <p>
        Halo, saya <strong>Muhammad Iqbal (DB Official)</strong>. Fokus saya ada di
        dunia web development—bikin tampilan kece sekaligus sistem yang jalan mulus
        di belakang layar. Intinya, saya suka ngubah ide random jadi produk digital
        yang beneran bisa dipakai orang.
      </p>
      <p>
        Beberapa project yang pernah saya garap: portal komunitas, platform rental
        mobil, sampai e-commerce. Buat saya, website itu bukan cuma pajangan, tapi
        tools biar orang bisa kerja lebih gampang, bisnis lebih rapi, dan interaksi
        jadi lebih seru. Kalau kamu punya ide, ayo bikin bareng biar langsung <em>go live</em>.
      </p>
    </div>
  );
}

/* ------------------ CollabBlock ------------------ */
function CollabBlock() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    const subject = encodeURIComponent("Kolaborasi Project");
    const body = encodeURIComponent(
      `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
    );

    window.location.href = `mailto:db.official@example.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 holo-text">
      <p>
        Tertarik kolaborasi? Isi form di bawah ini dan pesannya akan langsung
        terkirim ke email saya.
      </p>

      <input
        type="text"
        name="name"
        placeholder="Nama kamu"
        required
        className="input"
      />
      <input
        type="email"
        name="email"
        placeholder="Email kamu"
        required
        className="input"
      />
      <textarea
        name="message"
        placeholder="Ceritakan proyek atau ide kamu..."
        required
        rows={4}
        className="textarea"
      />

      <button type="submit" className="btn">
        Kirim
      </button>
    </form>
  );
}
