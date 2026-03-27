"use client";

import { motion } from "framer-motion";

const AREAS = [
  {
    icon: "⚡",
    title: "MIG Kaynak Sistemleri",
    desc: "WEC, WEC-S ve AT-DT serisi profesyonel MIG torçları. 150A'dan 700A'ya geniş kapasite aralığı.",
    tags: ["WEC Serisi", "AT-DT Serisi", "Su Soğutmalı"],
  },
  {
    icon: "🔥",
    title: "TIG Kaynak Torçları",
    desc: "Sıvıç kontrollü ve musluklu TIG torç serileri. Hassas kaynak işlemleri için yüksek performans.",
    tags: ["Sıvıç Kontrollü", "Musluklu", "Paslanmaz Çelik"],
  },
  {
    icon: "⚙️",
    title: "Plazma Kesim",
    desc: "Plazma elektrot ve memeleri. Trafimet, Cebora ve Lincoln uyumlu yedek parçalar.",
    tags: ["Elektrot", "Meme", "Tungsten"],
  },
  {
    icon: "🏭",
    title: "Endüstriyel Üniteler",
    desc: "CO2 ısıtıcı üniteleri, su soğutma sistemleri, elektronik kumanda kartları ve gaz valfleri.",
    tags: ["CO2 Isıtıcı", "Su Soğutma", "Elektronik Kart"],
  },
  {
    icon: "🔧",
    title: "Yedek Parça & Aksesuar",
    desc: "MIG ve TIG torçlarına özel 500+ çeşit yedek parça. Orijinal kalitede, uygun fiyatla.",
    tags: ["MIG Yedekleri", "TIG Yedekleri", "Tel Sürme"],
  },
  {
    icon: "🌍",
    title: "İhracat & Dağıtım",
    desc: "50'den fazla ülkeye ihracat. Uluslararası sertifikalı ürünler, küresel servis ağı.",
    tags: ["CE Sertifikalı", "ISO Standartları", "Global Destek"],
  },
];

export default function Features() {
  return (
    <section
      id="faaliyet"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--bg) 0%, #0b1220 100%)" }}
    >
      {/* Divider glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(249,115,22,0.6), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-block">Faaliyet Alanı</span>
          <h2
            className="font-black mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--text)" }}
          >
            Kaynak Teknolojisinde
            <br />
            <span className="text-gradient">Kapsamlı Çözümler</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base" style={{ color: "var(--muted)" }}>
            Kaynak makinenizin ihtiyaç duyduğu her ürün ve hizmeti tek çatı altında sunuyoruz.
            Türkiye'den dünyaya kaliteli kaynak ekipmanları.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AREAS.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-6 cursor-default group"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(249,115,22,0.4)";
                e.currentTarget.style.background = "var(--bg-card-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--bg-card)";
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{
                  background: "rgba(249,115,22,0.1)",
                  border: "1px solid rgba(249,115,22,0.2)",
                }}
              >
                {area.icon}
              </div>

              <h3
                className="font-bold text-lg mb-2"
                style={{ color: "var(--text)" }}
              >
                {area.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                {area.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {area.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      background: "rgba(249,115,22,0.07)",
                      border: "1px solid rgba(249,115,22,0.15)",
                      color: "rgba(249,115,22,0.9)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <div className="text-sm font-medium" style={{ color: "var(--muted)" }}>
            Sertifikalarımız:
          </div>
          {["/images/Tescil_Huner.png", "/images/Tescil_Dattweld.png", "/images/Tescil_Vec.png"].map((src, i) => (
            <div
              key={i}
              className="rounded-xl px-6 py-4 flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <img src={src} alt={`Tescil ${i + 1}`} className="h-12 object-contain opacity-80" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
