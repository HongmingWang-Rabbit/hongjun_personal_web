"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Navbar from "@/components/Navbar";

// Cultural works data
const culturalWorks = [
  { title: "来去泉州 幕后花絮", image: "/work-cultural-1.jpg", link: "https://v.douyin.com/z9FJ_9Ij-Dk/" },
  { title: "来去泉州 正片", image: "/work-cultural-2.jpg", link: "https://v.douyin.com/SGnsqSJ8NUY/" },
];

// AI thumbnails
const aiThumbs = [
  "/work-ai-thumb1.png",
  "/work-ai-thumb2.png",
  "/work-ai-thumb3.png",
  "/work-ai-thumb4.png",
  "/work-ai-thumb5.png",
  "/work-ai-thumb6.png",
];

// Game works
const gameWorks = [
  {
    title: "初代马里奥 为什么要加入烦人的惯性机制？",
    image: "/work-game-1.jpg",
    link: "https://www.bilibili.com/video/BV1zh411Q7MC/",
    stats: { views: "35.2w", likes: "1.7w+", favorites: "3341" },
  },
  {
    title: "【GTA】无止境流行电台 | 80s 90s 00s 流行乐",
    image: "/work-game-2.jpg",
    link: "https://www.bilibili.com/video/BV1JM411i75e",
    stats: { views: "96.5w", likes: "2.5w+", favorites: "3.2w+" },
  },
];

function ImagePreview({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      <button className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-gray-300 transition-colors">
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <Image src={src} alt="预览" width={1200} height={800} className="max-w-full max-h-full object-contain" onClick={e => e.stopPropagation()} />
    </div>
  );
}

function PortfolioCard({ item }: { item: { title: string; image: string; link: string } }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    }
  }, []);

  return (
    <div ref={ref} className="max-w-[200px]" style={{ opacity: 0 }}>
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="group block">
        <div className="relative overflow-hidden rounded-lg bg-gray-900 aspect-[3/4]">
          <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-sm">点击查看</span>
          </div>
        </div>
      </a>
    </div>
  );
}

export default function PortfolioPage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {previewImage && <ImagePreview src={previewImage} onClose={() => setPreviewImage(null)} />}

      <div ref={sectionRef} className="min-h-screen bg-black py-16 md:py-20" style={{ opacity: 0 }}>
        <div className="w-full max-w-6xl mx-auto px-6 md:px-8 lg:px-16 pt-16 md:pt-20">
          {/* Cultural/Travel Section */}
          <div className="mb-16 md:mb-20">
            <h3
              className="text-base md:text-lg text-white mb-6 md:mb-8 font-bold"
              style={{ transform: "scaleX(1.8)", transformOrigin: "left" }}
            >
              文旅综艺
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {culturalWorks.map((item) => (
                <PortfolioCard key={item.title} item={item} />
              ))}
            </div>
          </div>

          {/* AI Section */}
          <div className="mb-16 md:mb-20">
            <h3
              className="text-base md:text-lg text-white mb-6 md:mb-8 font-bold"
              style={{ transform: "scaleX(1.8)", transformOrigin: "left" }}
            >
              AI时代
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main AI video */}
              <div className="group cursor-pointer max-w-full lg:max-w-[300px]">
                <a href="https://www.bilibili.com/video/BV1xAF4zKEXd/" target="_blank" rel="noopener noreferrer">
                  <div className="relative overflow-hidden rounded-lg bg-gray-900">
                    <Image src="/work-ai-main.png" alt="看州视频" width={600} height={400} className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm">点击查看</span>
                    </div>
                  </div>
                </a>
                {/* Stats */}
                <div className="flex items-center gap-4 md:gap-6 pt-3 md:pt-4">
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>2.4w</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>450+</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span>1104</span>
                  </div>
                </div>
              </div>

              {/* Thumbnails + description */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {aiThumbs.map((thumb, i) => (
                    <div
                      key={i}
                      className="aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setPreviewImage(thumb)}
                    >
                      <Image src={thumb} alt={`缩略图 ${i + 1}`} width={300} height={170} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <h4 className="text-white text-sm">【看州旧闻联播】90年代「超能儿童」研究热潮</h4>
                  <p className="text-gray-500 text-xs mt-2">Nano Banana分镜生成+可灵图生视频</p>
                </div>
              </div>
            </div>
          </div>

          {/* Game Culture Section */}
          <div className="mb-16 md:mb-20">
            <h3
              className="text-base md:text-lg text-white mb-6 md:mb-8 font-bold"
              style={{ transform: "scaleX(1.8)", transformOrigin: "left" }}
            >
              个人游戏文化频道
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {gameWorks.map((work) => (
                <div key={work.title}>
                  <a href={work.link} target="_blank" rel="noopener noreferrer" className="group cursor-pointer block">
                    <div className="relative overflow-hidden rounded-lg bg-gray-900">
                      <Image
                        src={work.image}
                        alt={work.title}
                        width={600}
                        height={400}
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-sm">点击查看</span>
                      </div>
                    </div>
                  </a>
                  <p className="mt-2 md:mt-3 text-sm text-white font-bold">{work.title}</p>
                  <div className="flex items-center gap-3 md:gap-4 mt-1.5 md:mt-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{work.stats.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{work.stats.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      <span>{work.stats.favorites}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
