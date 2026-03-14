"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import Navbar from "@/components/Navbar";

// Cultural works data
const culturalWorks = [
  {
    title: "来去泉州 幕后花絮",
    image: "/work-cultural-1.jpg",
    link: "https://v.douyin.com/z9FJ_9Ij-Dk/",
  },
  {
    title: "来去泉州 正片",
    image: "/work-cultural-2.jpg",
    link: "https://v.douyin.com/SGnsqSJ8NUY/",
  },
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

// Tech news
const techNews = [
  {
    title: "吉利新技术逆天！续航2000KM+ 不加油不充电",
    image: "/tech-news/10741773448668_.pic.jpg",
    link: "https://www.douyin.com/video/7442908268793482546",
  },
  {
    title: "Win10就要停更 电脑不会自动更新啦！",
    image: "/tech-news/10761773448706_.pic.jpg",
    link: "https://www.douyin.com/video/7351652753065676072",
  },
];

// Blog posts (公众号图文)
const blogPosts = [
  {
    title: "来去泉州 第九期",
    image: "/blogs-image/10791773448799_.pic_hd.jpg",
    link: "https://mp.weixin.qq.com/s/tHEaRg2QWv_NfB1b2Dct9Q",
  },
  {
    title: "海边音乐会 Seaside Music Festival",
    image: "/blogs-image/10801773448800_.pic_hd.jpg",
    link: "https://mp.weixin.qq.com/s/TOE0ETurEh9EZvPK7y3ZkA",
  },
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
    <div
      role="dialog"
      aria-label="Image preview"
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-gray-300 cursor-pointer transition-colors"
        aria-label="Close preview"
      >
        <svg
          className="w-6 h-6 md:w-8 md:h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <Image
        src={src}
        alt="预览"
        width={1200}
        height={800}
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/** Hook: observe a container, then stagger-reveal its direct `[data-reveal]` children */
function useSectionReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Heading (first child with data-reveal-heading)
    const heading = el.querySelector<HTMLElement>("[data-reveal-heading]");
    // All stagger items
    const items = el.querySelectorAll<HTMLElement>("[data-reveal-item]");

    if (prefersReducedMotion) {
      if (heading) gsap.set(heading, { opacity: 1, x: 0 });
      items.forEach((item) => gsap.set(item, { opacity: 1, y: 0 }));
      return;
    }

    // Set initial state
    if (heading) gsap.set(heading, { opacity: 0, x: -30 });
    items.forEach((item) => gsap.set(item, { opacity: 0, y: 30 }));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (heading) {
            gsap.to(heading, {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          }
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.15,
          });
        } else {
          if (heading) gsap.set(heading, { opacity: 0, x: -30 });
          items.forEach((item) => gsap.set(item, { opacity: 0, y: 30 }));
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function StatIcon({ type }: { type: "views" | "likes" | "favorites" }) {
  if (type === "views")
    return (
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    );
  if (type === "likes")
    return (
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    );
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  );
}

export default function PortfolioPage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const culturalRef = useSectionReveal();
  const aiRef = useSectionReveal();
  const techNewsRef = useSectionReveal();
  const blogRef = useSectionReveal();
  const gameRef = useSectionReveal();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {previewImage && (
        <ImagePreview
          src={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}

      <div className="min-h-screen bg-black py-16 md:py-20">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-8 lg:px-16 pt-16 md:pt-20">
          {/* ── Cultural/Travel Section ── */}
          <div
            ref={culturalRef}
            className="mb-20 md:mb-28"
          >
            <h3
              data-reveal-heading
              className="text-base md:text-lg text-white mb-6 md:mb-8 font-bold"
            >
              <span className="heading-stretch-left font-heading">
                文旅综艺
              </span>
            </h3>
            <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-lg">
              {culturalWorks.map((item) => (
                <a
                  key={item.title}
                  data-reveal-item
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg bg-gray-900 aspect-[3/4]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <span className="text-white text-xs font-heading">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── AI Section ── */}
          <div
            ref={aiRef}
            className="mb-20 md:mb-28"
          >
            <h3
              data-reveal-heading
              className="text-base md:text-lg text-white mb-6 md:mb-8 font-bold"
            >
              <span className="heading-stretch-left font-heading">AI时代</span>
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
              {/* Main AI video */}
              <div data-reveal-item>
                <a
                  href="https://www.bilibili.com/video/BV1xAF4zKEXd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg bg-gray-900">
                    <Image
                      src="/work-ai-main.png"
                      alt="看州视频"
                      width={600}
                      height={400}
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm">点击查看</span>
                    </div>
                  </div>
                </a>
                {/* Stats */}
                <div className="flex items-center gap-5 pt-3 text-gray-500 text-xs">
                  <div className="flex items-center gap-1">
                    <StatIcon type="views" />
                    <span>2.4w</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StatIcon type="likes" />
                    <span>450+</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StatIcon type="favorites" />
                    <span>1104</span>
                  </div>
                </div>
              </div>

              {/* Thumbnails + description */}
              <div
                data-reveal-item
                className="space-y-4"
              >
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {aiThumbs.map((thumb, i) => (
                    <div
                      key={i}
                      className="aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setPreviewImage(thumb)}
                    >
                      <Image
                        src={thumb}
                        alt={`缩略图 ${i + 1}`}
                        width={300}
                        height={170}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="pt-1">
                  <h4 className="font-heading text-white text-sm">
                    【看州旧闻联播】90年代「超能儿童」研究热潮
                  </h4>
                  <p className="text-gray-500 text-xs mt-1.5">
                    Nano Banana分镜生成+可灵图生视频
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Tech News Section ── */}
          <div
            ref={techNewsRef}
            className="mb-20 md:mb-28"
          >
            <h3
              data-reveal-heading
              className="text-base md:text-lg text-white mb-6 md:mb-8 font-bold"
            >
              <span className="heading-stretch-left font-heading">
                科技资讯
              </span>
            </h3>
            <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-lg">
              {techNews.map((item) => (
                <a
                  key={item.link}
                  data-reveal-item
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg bg-gray-900 aspect-[3/4]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <span className="text-white text-xs font-heading">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Blog Posts Section ── */}
          <div
            ref={blogRef}
            className="mb-20 md:mb-28"
          >
            <h3
              data-reveal-heading
              className="text-base md:text-lg text-white mb-6 md:mb-8 font-bold"
            >
              <span className="heading-stretch-left font-heading">
                公众号图文
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {blogPosts.map((item) => (
                <a
                  key={item.link}
                  data-reveal-item
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg bg-gray-900 aspect-video">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <span className="text-white text-xs font-heading">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Game Culture Section ── */}
          <div
            ref={gameRef}
            className="mb-16 md:mb-20"
          >
            <h3
              data-reveal-heading
              className="text-base md:text-lg text-white mb-6 md:mb-8 font-bold"
            >
              <span className="heading-stretch-left font-heading">
                个人游戏文化频道
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {gameWorks.map((work) => (
                <div
                  key={work.title}
                  data-reveal-item
                >
                  <a
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group cursor-pointer block"
                  >
                    <div className="relative overflow-hidden rounded-lg bg-gray-900">
                      <Image
                        src={work.image}
                        alt={work.title}
                        width={600}
                        height={400}
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-sm">点击查看</span>
                      </div>
                    </div>
                  </a>
                  <p className="font-heading mt-2 md:mt-3 text-sm text-white font-bold">
                    {work.title}
                  </p>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <StatIcon type="views" />
                      <span>{work.stats.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <StatIcon type="likes" />
                      <span>{work.stats.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <StatIcon type="favorites" />
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
