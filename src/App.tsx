import MarkdownView from "./components/MarkdownView";
import ProjectsList from "./components/ProjectsList";
import HologramPanel from "./components/HologramPanel/HologramPanel";
import Hero from "./components/Hero";

export default function App() {
  return (
    <main className="container">
      <header><h1>PS5 Portfolio</h1></header>

      <HologramPanel>
        <Hero />
      </HologramPanel>

      <section>
        <h2>About</h2>
        <article className="card"><MarkdownView file="/content/about.md" /></article>
      </section>

      <section>
        <h2>Skills</h2>
        <article className="card"><MarkdownView file="/content/skills.md" /></article>
      </section>

      <section>
        <h2>Contact</h2>
        <article className="card"><MarkdownView file="/content/contact.md" /></article>
      </section>

      <ProjectsList />
    </main>
  );
}
