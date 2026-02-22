"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const softwareTools = [
  { name: "Ps", icon: "/icon-ps.png", level: 4 },
  { name: "Pr", icon: "/icon-pr.png", level: 4 },
  { name: "Ai", icon: "/icon-ai.png", level: 4 },
  { name: "Id", icon: "/icon-id.png", level: 3 },
  { name: "Rhino", icon: "/icon-rhino.png", level: 4 },
  { name: "Blender", icon: "/icon-blender.png", level: 2 },
  { name: "Keyshot", icon: "/icon-keyshot.png", level: 4 },
  { name: "Ae", icon: "/icon-ae.png", level: 2 },
  { name: "C4D", icon: "/icon-c4d.png", level: 2 },
  { name: "即梦", icon: "/icon-jimeng.png", level: 2 },
];

const hexagonSkills = [
  { name: "AI视频制作", value: 50 },
  { name: "平面设计", value: 70 },
  { name: "商业摄影", value: 60 },
  { name: "视频剪辑", value: 85 },
  { name: "趋势洞见", value: 65 },
  { name: "文案", value: 75 },
];

function getHexagonPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    })
    .join(" ");
}

function getSkillPointsAtProgress(cx: number, cy: number, maxR: number, progress: number): string {
  return hexagonSkills
    .map((skill, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const r = maxR * (skill.value / 100) * progress;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    })
    .join(" ");
}

function getLabelPosition(cx: number, cy: number, r: number, index: number) {
  const angle = (Math.PI / 3) * index - Math.PI / 2;
  const x = cx + r * Math.cos(angle);
  const y = cy + r * Math.sin(angle);

  let anchor: "middle" | "start" | "end" = "middle";
  let dy = 0;
  if (index === 0) dy = -8;
  else if (index === 3) dy = 16;
  else if (index === 1 || index === 2) anchor = "start";
  else if (index === 4 || index === 5) anchor = "end";

  let dx = 0;
  if (index === 1 || index === 2) dx = 8;
  if (index === 4 || index === 5) dx = -8;

  return { x: x + dx, y: y + dy, anchor };
}

export default function AbilitySection() {
  const cx = 160, cy = 160, maxR = 120;

  const headingRef = useScrollReveal<HTMLHeadingElement>({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    threshold: 0.5,
  });

  // --- Dots progress animation ---
  const toolsRef = useRef<HTMLDivElement>(null);
  const [dotsRevealed, setDotsRevealed] = useState(false);

  useEffect(() => {
    const el = toolsRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      requestAnimationFrame(() => setDotsRevealed(true));
      gsap.set(el, { opacity: 1 });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Fade in the container
          gsap.to(el, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" });
          // Trigger dot fill after a short delay
          setTimeout(() => setDotsRevealed(true), 300);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // --- Radar chart expand animation ---
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartProgress, setChartProgress] = useState(0);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      requestAnimationFrame(() => setChartProgress(1));
      gsap.set(el, { opacity: 1 });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Fade in the container
          gsap.to(el, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" });
          // Animate the radar polygon expanding
          const proxy = { value: 0 };
          gsap.to(proxy, {
            value: 1,
            duration: 1,
            delay: 0.3,
            ease: "power2.out",
            onUpdate: () => setChartProgress(proxy.value),
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="ability" className="relative w-full min-h-screen flex items-center justify-center py-16 md:py-20 bg-black">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8 lg:px-16">
        <h2 ref={headingRef} className="text-center text-lg md:text-xl text-white mb-6 md:mb-10 font-bold" style={{ opacity: 0 }}>
          <span className="heading-stretch font-heading">ABILITY</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Software tools grid */}
          <div ref={toolsRef} style={{ opacity: 0, transform: "translateX(-40px)" }}>
            <div className="grid grid-cols-2 gap-x-8 md:gap-x-12 gap-y-4 md:gap-y-6">
              {softwareTools.map((tool, toolIndex) => (
                <div key={tool.name} className="flex items-center gap-3 md:gap-4">
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={32}
                    height={32}
                    className="w-7 h-7 md:w-8 md:h-8 object-contain"
                  />
                  <div className="flex gap-1.5 md:gap-2">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const isFilled = i < tool.level;
                      // Stagger: each tool row delayed, each dot within the row delayed further
                      const delay = toolIndex * 0.06 + i * 0.04;
                      const shouldShow = dotsRevealed && isFilled;

                      return (
                        <div
                          key={i}
                          className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm transition-colors ease-out"
                          style={{
                            backgroundColor: shouldShow ? "#ffffff" : isFilled ? "#374151" : "#374151",
                            transitionDuration: "0.3s",
                            transitionDelay: dotsRevealed ? `${delay}s` : "0s",
                          }}
                        />
                      );
                    })}
                  </div>
                  <span className="sr-only">{tool.name}: {tool.level} out of 5</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hexagon radar chart */}
          <div ref={chartRef} className="flex justify-center" style={{ opacity: 0, transform: "translateX(40px)" }}>
            <div className="w-72 h-72 md:w-80 md:h-80">
              <svg viewBox="0 0 320 320" className="w-full h-full">
                {/* Outer hexagon */}
                <polygon
                  points={getHexagonPoints(cx, cy, maxR)}
                  fill="none"
                  stroke="white"
                />
                {/* Grid hexagons */}
                {[0.2, 0.4, 0.6, 0.8].map((scale) => (
                  <polygon
                    key={scale}
                    points={getHexagonPoints(cx, cy, maxR * scale)}
                    fill="none"
                    stroke="#333"
                    opacity="0.5"
                  />
                ))}
                {/* Skill area - animated */}
                <polygon
                  points={getSkillPointsAtProgress(cx, cy, maxR, chartProgress)}
                  fill="rgba(255, 255, 255, 0.5)"
                  stroke="white"
                />
                {/* SVG labels */}
                {hexagonSkills.map((skill, i) => {
                  const pos = getLabelPosition(cx, cy, maxR + 16, i);
                  return (
                    <text
                      key={skill.name}
                      x={pos.x}
                      y={pos.y}
                      textAnchor={pos.anchor}
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="11"
                      fontFamily="var(--font-body)"
                    >
                      {skill.name}
                    </text>
                  );
                })}
              </svg>
              {/* Screen-reader summary */}
              <div className="sr-only">
                Skill ratings: {hexagonSkills.map(s => `${s.name} ${s.value}%`).join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
