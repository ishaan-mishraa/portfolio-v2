export function SectionHeading({ index, title, kicker }: { index: string; title: string; kicker?: string }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-xs tracking-widest text-slate-500">
        {index} <span className="text-slate-700">/</span> {kicker ?? title.toUpperCase()}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-100 md:text-3xl">{title}</h2>
    </div>
  );
}
