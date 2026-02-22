"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

// Dynamic import to avoid SSR issues with Three.js
const Dither = dynamic(() => import("@/components/Dither"), { ssr: false });

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (textRef.current) gsap.set(textRef.current, { opacity: 1, x: 0 });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && textRef.current) {
          gsap.fromTo(
            textRef.current,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
          );
        } else if (textRef.current) {
          gsap.set(textRef.current, { opacity: 0, x: -100 });
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      {/* Dither background */}
      <div className="absolute inset-0">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          mouseRadius={0.3}
          waveSpeed={0.05}
          waveFrequency={3}
          waveAmplitude={0.3}
          colorNum={4}
          pixelSize={2}
          enableMouseInteraction={true}
        />
      </div>

      {/* Text overlay */}
      <div
        ref={textRef}
        className="absolute bottom-16 left-6 md:bottom-20 md:left-8 lg:left-16 z-10"
        style={{ opacity: 0 }}
      >
        <h1 className="heading-stretch-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wider mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          BOB XU
        </h1>
        <h2 className="heading-stretch-left text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          ETERNAL SPACE
        </h2>
        <p className="heading-stretch-left text-[10px] sm:text-xs text-gray-400 mt-3 md:mt-4 tracking-wider font-bold">
          网站前端为AI辅助制作
        </p>
      </div>
    </section>
  );
}
