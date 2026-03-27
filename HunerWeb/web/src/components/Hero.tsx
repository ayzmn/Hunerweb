"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SPARKS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

const STATS = [
  { value: "72+", label: "Yıllık Deneyim" },
  { value: "500+", label: "Ürün Çeşidi" },
  { value: "50+", label: "Ülkeye İhracat" },
  { value: "10K+", label: "Mutlu Müşteri" },
];

const FEATURES = [
  "MIG & TIG Torç Sistemleri",
  "Endüstriyel Kaynak Ekipmanları",
  "Yedek Parça & Aksesuar",
  "Teknik Destek & Servis",
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Particle canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[] = [];

    const addParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5 + 0.5;
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.6 + Math.random() * 100,
        vx: Math.cos(angle) * speed,
        vy: -Math.random() * 2 - 0.5,
        life: 0,
        maxLife: Math.random() * 120 + 60,
        size: Math.random() * 2 + 0.5,
      });
    };

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      if (frame % 3 === 0) addParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const alpha = 1 - p.life / p.maxLife;
        const hue = 20 + Math.random() * 20;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${alpha})`;
        ctx.fill();
        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(249,115,22,0.08) 0%, transparent 70%), var(--bg)",
      }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Glowing orb */}
      <div
        className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {mounted && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <span className="section-tag">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "var(--orange)" }}
                />
                Türkiye'nin Kaynak Ekipmanları Lideri
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-black leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              <span style={{ color: "var(--text)" }}>Kaynak Teknolojisinde</span>
              <br />
              <span className="text-gradient">72 Yıllık Uzmanlık</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              MIG torçlarından TIG sistemlerine, plazma ekipmanlarından yedek
              parçalara kadar profesyonel kaynak çözümleri. Kalite, dayanıklılık
              ve teknik destek ile yanınızdayız.
            </motion.p>

            {/* Feature chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap justify-center gap-2 mb-10"
            >
              {FEATURES.map((f) => (
                <span
                  key={f}
                  className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(249,115,22,0.08)",
                    border: "1px solid rgba(249,115,22,0.2)",
                    color: "rgba(241,245,249,0.75)",
                  }}
                >
                  {f}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            >
              <button
                onClick={() =>
                  document.getElementById("urunler")?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                  boxShadow: "0 0 30px rgba(249,115,22,0.4)",
                }}
              >
                Ürünleri Keşfet
              </button>
              <button
                onClick={() =>
                  document.getElementById("iletisim")?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(249,115,22,0.08)",
                  border: "1px solid rgba(249,115,22,0.3)",
                  color: "var(--text)",
                }}
              >
                İletişime Geç
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="rounded-2xl p-5 text-center"
                  style={{
                    background: "rgba(15,22,36,0.8)",
                    border: "1px solid rgba(249,115,22,0.15)",
                  }}
                >
                  <div
                    className="text-3xl font-black mb-1 text-gradient"
                  >
                    {s.value}
                  </div>
                  <div className="text-xs font-medium" style={{ color: "var(--muted)" }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          Aşağı kaydır
        </span>
        <div
          className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
          style={{ borderColor: "rgba(249,115,22,0.4)" }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--orange)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
