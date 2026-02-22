"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ScrollRevealOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    threshold = 0.2,
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, x: 0, y: 0 });
      return;
    }

    gsap.set(el, from);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, to);
          if (once) observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
