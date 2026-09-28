const stars = (n) => "*".repeat(n);

export default function GarageCard({ c }) {
  return (
    <div className="rounded-xl border border-white/15 p-6">
      <h3 className="text-xl font-bold">{c.name}</h3>
      <p className="text-sm text-white/60">{c.address}, {c.city}, {c.state}</p>
      <p className="mt-2 font-bold text-accent">Rating: {c.rating}</p>
      <p className="mt-3 text-xs text-white/70">Brands: {c.brands.join(", ")}</p>
      <p className="text-xs text-white/70">Services: {c.services.join(", ")}</p>

      <div className="mt-4 border-t border-white/10 pt-4 text-sm text-white/70">
        {c.reviews.map((r, i) => (
          <p key={i}>
            <span className="text-accent">{stars(r.stars)}</span> {r.text} ({r.by})
          </p>
        ))}
      </div>

      <a href="#book" className="mt-4 inline-block rounded-full bg-accent px-4 py-1 text-sm font-semibold">Book this garage</a>
    </div>
  );
}