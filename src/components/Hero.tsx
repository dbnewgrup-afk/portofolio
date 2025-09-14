export default function Hero() {
  return (
    <section className="hero">
      <img src="/images/controller.webp" alt="DualSense" className="hero-img" />

      <div className="hud-card">
        <p className="label">About Me</p>
        <h3 className="name">Tuan</h3>
        <p className="role">Web Developer</p>

        <div className="hud-row">
          <div className="avatar" aria-hidden="true">T</div>
          <p className="desc">
            Fokus bangun produk live. UI rapih, performa cepat, alur bayar aman.
            Portfolio ini mode PS5, ringan dan mudah diupdate.
          </p>
        </div>
      </div>

      <p className="hint">Klik tombol di stik untuk jelajah</p>
    </section>
  );
}
