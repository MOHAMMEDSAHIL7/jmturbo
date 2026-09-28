export default function CarInfo({ info }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="max-w-3xl text-lg text-white/70">{info.history}</p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {info.stages.map((s) => (
          <div key={s.name} className="border-t border-white/20 pt-4">
            <p className="text-sm font-bold uppercase tracking-widest text-accent">{s.name}</p>
            <p className="mt-2 text-white/70">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        {info.parts.map((p) => (
          <span key={p} className="rounded-full border border-white/20 px-4 py-1 text-sm">
            {p}
          </span>
        ))}
      </div>

      <a href="#garages" className="mt-12 inline-block text-sm uppercase tracking-widest text-accent">
        Find tuning shops →
      </a>
    </section>
  );
}