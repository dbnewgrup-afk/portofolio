import MarkdownView from "./MarkdownView";

const files = [
  "/content/projects/proj-1.md",
  "/content/projects/proj-2.md",
  "/content/projects/proj-3.md",
];

export default function ProjectsList() {
  return (
    <section>
      <h2>Projects</h2>
      {files.map((f) => (
        <MarkdownView key={f} file={f} />
      ))}
    </section>
  );
}
