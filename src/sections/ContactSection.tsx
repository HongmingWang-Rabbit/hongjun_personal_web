"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactSection() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

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
          className="text-center text-lg md:text-xl tracking-[0.3em] text-white mb-12 md:mb-20 font-bold"
          style={{ transform: "scaleX(1.8)" }}
        >
          CONTACT
        </h2>

        <div className="flex flex-col items-center gap-8 md:gap-12">
          {/* Phone */}
          <button
            onClick={() => copyToClipboard("18759902726", "phone")}
            className="flex items-center gap-3 md:gap-4 group"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-base md:text-xl text-white link-underline relative">
              18759902726
            </span>
            {copiedPhone && (
              <span className="text-xs text-green-400 ml-2">已复制</span>
            )}
          </button>

          {/* Email */}
          <button
            onClick={() => copyToClipboard("xuhongjun2016@126.com", "email")}
            className="flex items-center gap-3 md:gap-4 group"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-base md:text-xl text-white link-underline relative break-all">
              xuhongjun2016@126.com
            </span>
            {copiedEmail && (
              <span className="text-xs text-green-400 ml-2">已复制</span>
            )}
          </button>

          {/* WeChat QR */}
          <div className="mt-4 md:mt-8">
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
