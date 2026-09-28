"use client";
import { useEffect, useRef, useState } from "react";

export default function Reveal({ children }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        className={
          "absolute left-0 top-0 h-px w-full origin-left bg-accent transition-transform duration-1000 " +
          (shown ? "scale-x-100" : "scale-x-0")
        }
      />
      <div
        className={
          "transition-all delay-500 duration-1000 " +
          (shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")
        }
      >
        {children}
      </div>
    </div>
  );
}