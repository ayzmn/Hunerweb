"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Anasayfa", href: "#hero" },
  { label: "Faaliyet Alanı", href: "#faaliyet" },
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "Ürünler", href: "#urunler" },
  { label: "İletişim", href: "#iletisim" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(8, 12, 20, 0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(249,115,22,0.15)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("#hero")}
          className="flex items-center gap-3 focus:outline-none"
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)" }}
          >
            <Image
              src="/images/Logo_huner.jpg"
              alt="Hüner Logo"
              width={32}
              height={32}
              className="rounded object-cover"
            />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-white text-lg tracking-wide">HÜNER</div>
            <div className="text-xs" style={{ color: "var(--orange)" }}>
              Ltd. Şti.
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            return (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none"
                style={{
                  color: isActive ? "var(--orange)" : "rgba(241,245,249,0.7)",
                  background: isActive ? "rgba(249,115,22,0.1)" : "transparent",
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: "var(--orange)" }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA */}
        <button
          onClick={() => handleNav("#iletisim")}
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            color: "white",
            boxShadow: "0 0 20px rgba(249,115,22,0.3)",
          }}
        >
          Teklif Al
        </button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menü"
        >
          <div className="space-y-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-0.5 w-6 transition-all duration-300"
                style={{
                  background: "var(--orange)",
                  transform:
                    menuOpen
                      ? i === 0
                        ? "rotate(45deg) translate(4px, 5px)"
                        : i === 2
                        ? "rotate(-45deg) translate(4px, -5px)"
                        : "opacity:0"
                      : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 space-y-1"
          style={{ background: "rgba(8,12,20,0.98)", borderTop: "1px solid rgba(249,115,22,0.1)" }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors"
              style={{ color: "rgba(241,245,249,0.8)" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#iletisim")}
            className="w-full mt-2 py-3 rounded-lg text-sm font-semibold"
            style={{ background: "var(--orange)", color: "white" }}
          >
            Teklif Al
          </button>
        </div>
      )}
    </header>
  );
}
