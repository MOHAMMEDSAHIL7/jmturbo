"use client";
import { useState } from "react";
import { companies } from "../data/companies";
import GarageCard from "./GarageCard";

const unique = (list) => ["All", ...new Set(list)];
const cities = unique(companies.map((c) => c.city));
const brands = unique(companies.flatMap((c) => c.brands));
const services = unique(companies.flatMap((c) => c.services));

function Select({ label, options, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className="rounded-full border border-white/20 bg-black px-4 py-2 text-sm"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o === "All" ? label + ": All" : o}
        </option>
      ))}
    </select>
  );
}

export default function Directory() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");
  const [brand, setBrand] = useState("All");
  const [service, setService] = useState("All");
  const [sort, setSort] = useState("rating");

  const list = companies
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => city === "All" || c.city === city)
    .filter((c) => brand === "All" || c.brands.includes(brand))
    .filter((c) => service === "All" || c.services.includes(service))
    .sort((a, b) =>
      sort === "rating" ? b.rating - a.rating : a.name.localeCompare(b.name)
    );

  return (
    <section id="garages" className="mx-auto max-w-6xl px-6 py-32">
      <h2 className="text-5xl font-black uppercase tracking-wider md:text-7xl">
        Tuning <span className="text-accent">Garages</span>
      </h2>

      <div className="mt-10 flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search garage name"
          className="rounded-full border border-white/20 bg-black px-4 py-2 text-sm"
        />
        <Select label="City" options={cities} value={city} onChange={setCity} />
        <Select label="Brand" options={brands} value={brand} onChange={setBrand} />
        <Select label="Service" options={services} value={service} onChange={setService} />
        <Select label="Sort" options={["rating", "name"]} value={sort} onChange={setSort} />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {list.map((c) => (
          <GarageCard key={c.id} c={c} />
        ))}
        {list.length === 0 && (
          <p className="text-white/60">No garages match your filters.</p>
        )}
      </div>
    </section>
  );
}