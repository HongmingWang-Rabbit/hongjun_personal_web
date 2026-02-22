"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToContact = () => {
    setMobileOpen(false);
    if (pathname !== "/") {
      window.location.href = "/#contact";
      return;
    }
    const el = document.getElementById("contact");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWork = () => {
    setMobileOpen(false);
    if (pathname !== "/") {
      window.location.href = "/#work";
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 md:px-8 lg:px-16 py-4 md:py-6 flex items-center justify-between">
        <button onClick={scrollToWork} className="cursor-pointer">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          <button
            onClick={scrollToWork}
            aria-current={isActive("/") ? "page" : undefined}
            className={`font-heading text-sm tracking-wider cursor-pointer transition-colors duration-300 hover:text-white ${
              isActive("/") ? "text-white" : "text-gray-500"
            }`}
          >
            工作
          </button>
          <Link
            href="/portfolio"
            aria-current={isActive("/portfolio") ? "page" : undefined}
            className={`font-heading text-sm tracking-wider cursor-pointer transition-colors duration-300 hover:text-white ${
              isActive("/portfolio") ? "text-white" : "text-gray-500"
            }`}
          >
            作品
          </Link>
          <Link
            href="/about"
            aria-current={isActive("/about") ? "page" : undefined}
            className={`font-heading text-sm tracking-wider cursor-pointer transition-colors duration-300 hover:text-white ${
              isActive("/about") ? "text-white" : "text-gray-500"
            }`}
          >
            关于我
          </Link>
          <button
            onClick={scrollToContact}
            className="font-heading text-sm tracking-wider cursor-pointer transition-colors duration-300 text-gray-500 hover:text-white"
          >
            联系
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 flex flex-col gap-4">
          <button
            onClick={scrollToWork}
            aria-current={isActive("/") ? "page" : undefined}
            className={`text-left font-heading text-sm tracking-wider cursor-pointer ${isActive("/") ? "text-white" : "text-gray-500"}`}
          >
            工作
          </button>
          <Link
            href="/portfolio"
            onClick={() => setMobileOpen(false)}
            aria-current={isActive("/portfolio") ? "page" : undefined}
            className={`font-heading text-sm tracking-wider cursor-pointer ${isActive("/portfolio") ? "text-white" : "text-gray-500"}`}
          >
            作品
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            aria-current={isActive("/about") ? "page" : undefined}
            className={`font-heading text-sm tracking-wider cursor-pointer ${isActive("/about") ? "text-white" : "text-gray-500"}`}
          >
            关于我
          </Link>
          <button
            onClick={scrollToContact}
            className="text-left font-heading text-sm tracking-wider cursor-pointer text-gray-500"
          >
            联系
          </button>
        </div>
      </div>
    </nav>
  );
}
