import { howItWorks, partsCatalog, glossary } from "../data/education";

export default function Education() {
  return (
    <section id="learn" className="mx-auto max-w-6xl px-6 py-32">
      <h2 className="text-5xl font-black uppercase tracking-wider md:text-7xl">
        How <span className="text-accent">Tuning</span> Works
      </h2>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {howItWorks.map((h) => (
          <div key={h.title} className="border-t border-white/20 pt-4">
            <p className="font-bold uppercase tracking-widest">{h.title}</p>
            <p className="mt-2 text-white/70">{h.text}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-24 text-3xl font-black uppercase tracking-wider">Raw Parts Needed</h3>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {partsCatalog.map((p) => (
          <div key={p.name} className="rounded-xl border border-white/15 p-5">
            <p className="font-bold text-accent">{p.name}</p>
            <p className="mt-2 text-sm text-white/70">{p.text}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-24 text-3xl font-black uppercase tracking-wider">Glossary</h3>
      <dl className="mt-8 grid gap-4 md:grid-cols-2">
        {glossary.map((g) => (
          <div key={g.term} className="border-b border-white/10 pb-3">
            <dt className="font-bold">{g.term}</dt>
            <dd className="text-sm text-white/60">{g.meaning}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}