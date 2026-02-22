"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="min-h-screen bg-black flex items-center">
        <div
          ref={contentRef}
          className="w-full max-w-6xl mx-auto px-6 md:px-8 lg:px-16 pt-20 pb-10"
          style={{ opacity: 0 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Photo */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-64 h-80 md:w-80 md:h-96 overflow-hidden rounded-lg">
                <Image
                  src="/about-photo.png"
                  alt="个人照片"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">
                折腾到底星人
              </h2>
              <div className="space-y-4 md:space-y-6 text-gray-300 text-sm md:text-base leading-relaxed">
                <p>工业设计出身，擅长平面视觉呈现，将信息与观点进行结构化表达；</p>
                <p>对商业趋势、美学风格与科技议题保持持续关注，并将 AI 工具实际应用于选题整理、文案生成与内容包装；</p>
                <p>具备个人账号运营经验，曾独立策划并运营 Bilibili 游戏知识类栏目，单条内容最高播放量 40w+；</p>
                <p>乐于学习各种技能：手工模型制作、Vibe Coding、用Agent类AI优化工作流等。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
