import { useEffect, useState } from "react";
import { loadMarkdown } from "../../lib/loadMarkdown";

export default function AboutPanel() {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    let on = true;
    loadMarkdown("/content/about.md").then((res) => { if (on) setHtml(res); });
    return () => { on = false; };
  }, []);

  return (
    <div className="panel">
      <h2 className="panel-title">Profil</h2>
      <div className="panel-text" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
