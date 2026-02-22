"use client";

import Image from "next/image";

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

function getSkillPoints(cx: number, cy: number, maxR: number): string {
  return hexagonSkills
    .map((skill, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const r = maxR * (skill.value / 100);
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    })
    .join(" ");
}

export default function AbilitySection() {
  const cx = 140, cy = 140, maxR = 120;

  return (
    <section id="ability" className="relative w-full min-h-screen flex items-center justify-center py-16 md:py-20 bg-black">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8 lg:px-16">
        <h2
          className="text-center text-lg md:text-xl tracking-[0.3em] text-white mb-12 md:mb-20 font-bold"
          style={{ transform: "scaleX(1.8)" }}
        >
          ABILITY
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Software tools grid */}
          <div>
            <div className="grid grid-cols-2 gap-x-8 md:gap-x-12 gap-y-4 md:gap-y-6">
              {softwareTools.map((tool) => (
                <div key={tool.name} className="flex items-center gap-3 md:gap-4">
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={32}
                    height={32}
                    className="w-7 h-7 md:w-8 md:h-8 object-contain"
                  />
                  <div className="flex gap-1.5 md:gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm ${
                          i < tool.level ? "bg-white" : "bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hexagon radar chart */}
          <div className="flex justify-center relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <svg viewBox="0 0 280 280" className="w-full h-full">
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
                {/* Skill area */}
                <polygon
                  points={getSkillPoints(cx, cy, maxR)}
                  fill="rgba(255, 255, 255, 0.5)"
                  stroke="white"
                />
              </svg>

              {/* Labels */}
              <span className="absolute top-0 md:top-2 left-1/2 -translate-x-1/2 text-white text-[10px] md:text-xs whitespace-nowrap">
                AI视频制作
              </span>
              <span className="absolute top-[22%] right-0 translate-x-1 md:translate-x-2 text-white text-[10px] md:text-xs whitespace-nowrap">
                平面设计
              </span>
              <span className="absolute bottom-[22%] right-0 translate-x-1 md:translate-x-2 text-white text-[10px] md:text-xs whitespace-nowrap">
                商业摄影
              </span>
              <span className="absolute bottom-0 md:bottom-2 left-1/2 -translate-x-1/2 text-white text-[10px] md:text-xs whitespace-nowrap">
                视频剪辑
              </span>
              <span className="absolute bottom-[22%] left-0 -translate-x-1 md:-translate-x-2 text-white text-[10px] md:text-xs whitespace-nowrap">
                趋势洞见
              </span>
              <span className="absolute top-[22%] left-0 -translate-x-1 md:-translate-x-2 text-white text-[10px] md:text-xs whitespace-nowrap">
                文案
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
