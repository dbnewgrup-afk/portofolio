import { useEffect, useState } from "react";
import { marked } from "marked";          // <— ini yang hilang
import { loadMarkdown } from "../lib/loadMarkdown";

export default function MarkdownView({ file }: { file: string }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    loadMarkdown(file).then(setContent);
  }, [file]);

  return (
    <article
      className="card"
      dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
    />
  );
}
