"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ContactSection() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const headingRef = useScrollReveal<HTMLHeadingElement>({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    threshold: 0.3,
  });

  const phoneRef = useScrollReveal<HTMLDivElement>({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 },
    threshold: 0.3,
  });

  const emailRef = useScrollReveal<HTMLDivElement>({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.2 },
    threshold: 0.3,
  });

  const wechatRef = useScrollReveal<HTMLDivElement>({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.3 },
    threshold: 0.3,
  });

  const copyToClipboard = async (text: string, type: "phone" | "email") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "phone") {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section id="contact" className="relative w-full min-h-screen flex items-center justify-center py-16 md:py-20 bg-black">
      <div className="w-full max-w-4xl mx-auto px-6 md:px-8 lg:px-16">
        <h2
          ref={headingRef}
          className="text-center text-lg md:text-xl text-white mb-6 md:mb-10 font-bold"
          style={{ opacity: 0 }}
        >
          <span className="heading-stretch font-heading">CONTACT</span>
        </h2>

        <div className="flex flex-col items-center gap-8 md:gap-12">
          {/* Phone */}
          <div ref={phoneRef} className="flex flex-col items-center gap-1" style={{ opacity: 0 }}>
            <span className="text-[10px] text-gray-500 tracking-widest uppercase font-heading">Phone</span>
            <button
              onClick={() => copyToClipboard("18759902726", "phone")}
              className="relative flex items-center gap-3 md:gap-4 group cursor-pointer"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-base md:text-xl text-white link-underline relative">
                18759902726
              </span>
              {copiedPhone && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-green-400 whitespace-nowrap">已复制</span>
              )}
            </button>
          </div>

          {/* Email */}
          <div ref={emailRef} className="flex flex-col items-center gap-1" style={{ opacity: 0 }}>
            <span className="text-[10px] text-gray-500 tracking-widest uppercase font-heading">Email</span>
            <button
              onClick={() => copyToClipboard("xuhongjun2016@126.com", "email")}
              className="relative flex items-center gap-3 md:gap-4 group cursor-pointer"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-base md:text-xl text-white link-underline relative break-all">
                xuhongjun2016@126.com
              </span>
              {copiedEmail && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-green-400 whitespace-nowrap">已复制</span>
              )}
            </button>
          </div>

          {/* WeChat QR */}
          <div ref={wechatRef} className="mt-4 md:mt-8 flex flex-col items-center gap-1" style={{ opacity: 0 }}>
            <span className="text-[10px] text-gray-500 tracking-widest uppercase font-heading">WeChat</span>
            <Image
              src="/wechat-qr.png"
              alt="微信二维码"
              width={128}
              height={128}
              className="w-28 h-28 md:w-32 md:h-32 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
