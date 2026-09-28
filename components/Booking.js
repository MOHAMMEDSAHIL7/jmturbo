"use client";
import { useState } from "react";
import { companies } from "../data/companies";

const box = "w-full rounded-lg border border-white/20 bg-black px-4 py-2 text-sm";
const nextStatus = { Pending: "Confirmed", Confirmed: "Completed", Completed: "Completed" };

export default function Booking() {
  const [form, setForm] = useState({
    company: companies[0].name,
    brand: "BMW",
    model: "",
    service: "Stage 1 Remap",
    date: "",
    name: "",
    phone: "",
    email: "",
  });
  const [bookings, setBookings] = useState([]);
  const [done, setDone] = useState(null);
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = () => {
    if (!form.name || !form.phone || !form.date) {
      setError("Please fill in your name, phone and preferred date.");
      return;
    }
    setError("");
    const booking = { ...form, id: Date.now(), status: "Pending" };
    setBookings([booking, ...bookings]);
    setDone(booking);
  };

  const advance = (id) =>
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status: nextStatus[b.status] } : b)));

  return (
    <section id="book" className="mx-auto max-w-3xl px-6 py-32">
      <h2 className="text-5xl font-black uppercase tracking-wider md:text-7xl">
        Book a <span className="text-accent">Slot</span>
      </h2>

      {done ? (
        <div className="mt-10 rounded-xl border border-white/15 p-6">
          <p className="text-2xl font-bold text-accent">Request sent</p>
          <p className="mt-3 text-white/70">
            {done.name}, your request for {done.brand} {done.model} ({done.service}) at {done.company} on{" "}
            {done.date} is now Pending.
          </p>
          <p className="mt-2 text-sm text-white/50">
            A confirmation email will be sent to {done.email || "your email"} once the backend is added.
          </p>
          <button
            onClick={() => setDone(null)}
            className="mt-6 rounded-full bg-accent px-5 py-2 text-sm font-semibold"
          >
            Book another
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-4">
          <select value={form.company} onChange={set("company")} className={box}>
            {companies.map((c) => (
              <option key={c.id} value={c.name}>{c.name} - {c.city}</option>
            ))}
          </select>
          <div className="grid gap-4 md:grid-cols-2">
            <select value={form.brand} onChange={set("brand")} className={box}>
              <option>BMW</option>
              <option>Toyota Supra</option>
              <option>Mitsubishi Lancer Evo</option>
              <option>Other</option>
            </select>
            <input value={form.model} onChange={set("model")} placeholder="Car model (e.g. M3 2018)" className={box} />
          </div>
          <select value={form.service} onChange={set("service")} className={box}>
            <option>Stage 1 Remap</option>
            <option>Stage 2</option>
            <option>Stage 3</option>
            <option>Dyno Tuning</option>
            <option>Exhaust</option>
            <option>Suspension</option>
          </select>
          <input type="datetime-local" value={form.date} onChange={set("date")} className={box} />
          <div className="grid gap-4 md:grid-cols-3">
            <input value={form.name} onChange={set("name")} placeholder="Your name" className={box} />
            <input value={form.phone} onChange={set("phone")} placeholder="Phone" className={box} />
            <input value={form.email} onChange={set("email")} placeholder="Email" className={box} />
          </div>
          {error && <p className="text-sm text-accent">{error}</p>}
          <button onClick={submit} className="rounded-full bg-accent px-6 py-3 font-semibold">
            Submit request
          </button>
        </div>
      )}

      {bookings.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-black uppercase tracking-wider">Your bookings</h3>
          <div className="mt-6 space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-xl border border-white/15 p-4 text-sm">
                <p>{b.company} - {b.brand} - {b.service}</p>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-white/10 px-3 py-1">{b.status}</span>
                  <button onClick={() => advance(b.id)} className="text-xs text-accent">
                    Next status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}