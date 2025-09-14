type Props = { title?: string; children: React.ReactNode };

export default function HologramPanel({ title, children }: Props) {
  return (
    <section className="holo" aria-label={title || "panel"}>
      <div className="holo-scan" />
      {title ? <h2>{title}</h2> : null}
      {children}
    </section>
  );
}
