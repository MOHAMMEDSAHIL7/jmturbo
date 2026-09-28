"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Cars Tuned" },
  { value: 50, suffix: "+", label: "Partner Garages" },
  { value: 12, suffix: "", label: "Cities" },
];

function Counter({ value, suffix, label }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 2000;
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setCount(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="border-l border-white/20 pl-6">
      <p className="text-6xl font-black md:text-8xl">
        {count}
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-2 text-sm uppercase tracking-widest text-white/60">{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-32 md:grid-cols-3">
      {stats.map((s) => (
        <Counter key={s.label} {...s} />
      ))}
    </section>
  );
}