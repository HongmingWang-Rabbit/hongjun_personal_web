"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const careerData = [
  {
    id: 0,
    title: "创意策划",
    company: "地球人互娱",
    location: "泉州",
    period: "2024.6~2025.10",
    descriptions: [
      "【文旅直播综艺策划】参与策划一周一期的抖音户外多机位行走直播综艺，周期4个月，共12期。",
      "【医美类短视频代运营项目】负责账号定位与内容策划，统筹各大平台运营，输出文案30篇+。",
      "【科技资讯短视频媒体】独立完成选题、文案、剪辑与封面设计，输出中立解读文案，输出文案20篇+。",
    ],
    skills: ["策划", "文案", "剪辑"],
    image: "/career-quanzhou.png",
  },
  {
    id: 1,
    title: "剪辑与内容运营实习生",
    company: "吉利集团",
    location: "杭州",
    period: "2024.3~7",
    descriptions: [
      "【内容策划】根据部门选题策划会，负责抖音、小红书等新媒体平台的新闻稿策划与发布；独立完成视频剪辑与图文特效制作，累计产出并发布4期视频内容；通过评论区互动与用户运营，提升账号活跃度与日常互动量。",
    ],
    skills: ["文案", "剪辑"],
    image: "/career-hangzhou.png",
  },
];

export default function CareerPathSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const current = careerData[activeIndex];

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center py-16 md:py-20"
      style={{
        backgroundImage: `url(${current.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 lg:px-16 pb-24">
        <h2
          className="text-center text-lg md:text-xl tracking-[0.3em] text-white mb-10 md:mb-16 font-bold"
          style={{ transform: "scaleX(1.8)" }}
        >
          CAREER PATH
        </h2>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Text content */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">{current.title}</h3>
            <p className="text-gray-300">
              {current.company} / {current.location} &nbsp;&nbsp; {current.period}
            </p>
            <div className="space-y-3 md:space-y-4 mt-6 md:mt-8">
              {current.descriptions.map((desc, i) => (
                <p key={i} className="text-gray-400 text-sm leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>
            <div className="flex gap-3 md:gap-4 mt-6 md:mt-8 flex-wrap">
              {current.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-1 border border-gray-600 rounded-full text-xs text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Image preview - hidden on mobile, shown on lg */}
          <div className="hidden lg:block">
            <Image
              src={current.image}
              alt={current.company}
              width={500}
              height={350}
              className="rounded-lg object-cover w-full"
            />
          </div>
        </div>
      </div>

      {/* Navigation arrows - positioned relative to the section */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-6 z-20">
        <button
          onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          className={`w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center transition-all duration-300 ${
            activeIndex === 0
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-white/10 hover:border-white"
          }`}
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          {careerData.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === i ? "bg-white" : "bg-gray-600"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setActiveIndex(Math.min(careerData.length - 1, activeIndex + 1))}
          disabled={activeIndex === careerData.length - 1}
          className={`w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center transition-all duration-300 ${
            activeIndex === careerData.length - 1
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-white/10 hover:border-white"
          }`}
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
