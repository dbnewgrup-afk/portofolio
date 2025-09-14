import MarkdownView from "./components/MarkdownView";

export default function App() {
  return (
    <main className="container">
      <header>
        <h1>PS5 Portfolio</h1>
      </header>

      <section className="card" aria-label="Hero">
        <img
          src="/images/controller.webp"
          alt="PS5 DualSense Controller"
          className="responsive"
          loading="eager"
        />
      </section>

      <section>
        <h2>About</h2>
        <MarkdownView file="/content/about.md" />
      </section>

      <section>
        <h2>Skills</h2>
        <MarkdownView file="/content/skills.md" />
      </section>

      <section>
        <h2>Contact</h2>
        <MarkdownView file="/content/contact.md" />
      </section>
    </main>
  );
}
