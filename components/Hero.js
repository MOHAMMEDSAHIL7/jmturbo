"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const wrapRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const tween = gsap.to(titleRef.current, {
      yPercent: 40,
      ease: "none",
      scrollTrigger: {
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    return () => {
      tween.scrollTrigger && tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative h-screen overflow-hidden">
      <video
        src="/assets/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div ref={titleRef} className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-7xl font-black tracking-widest md:text-9xl">
          JM<span className="text-accent">TURBO</span>
        </h1>
      </div>
    </section>
  );
}