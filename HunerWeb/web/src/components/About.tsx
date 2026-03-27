"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const MILESTONES = [
  { year: "1990", text: "İstanbul'da kurulan Hüner Ltd., kaynak ekipmanları üretimine başladı." },
  { year: "2000", text: "İlk uluslararası ihracat. Avrupa pazarlarına WEC serisi torçlar sunuldu." },
  { year: "2010", text: "ISO sertifikasyonu alındı. Üretim kapasitesi 3 katına çıkarıldı." },
  { year: "2020", text: "Dijital dönüşüm ve yeni WEC-S serisi ile pazar liderliği pekiştirildi." },
];

export default function About() {
  return (
    <section
      id="hakkimizda"
      className="relative py-28 overflow-hidden"
      style={{ background: "#0b1220" }}
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(249,115,22,1) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-tag mb-6 inline-block">Hakkımızda</span>
            <h2
              className="font-black mb-6 leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--text)" }}
            >
              Kaynak Sektörünün
              <br />
              <span className="text-gradient">Güvenilir Partneri</span>
            </h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
              <p>
                1990 yılında İstanbul'da kurulan <strong style={{ color: "var(--text)" }}>Hüner Ltd.</strong>,
                30 yılı aşkın deneyimiyle Türkiye'nin önde gelen kaynak ekipmanları üreticilerinden
                biri haline gelmiştir.
              </p>
              <p>
                MIG torçlarından TIG sistemlerine, CO2 ısıtıcılardan plazma ekipmanlarına kadar
                500'ü aşkın ürün çeşidiyle sanayi kuruluşlarının, tersanelerin ve imalat firmalarının
                kaynak ihtiyaçlarını karşılıyoruz.
              </p>
              <p>
                Dattweld ve Vec markaları çatısı altında üretilen ürünlerimiz,{" "}
                <strong style={{ color: "var(--text)" }}>50'den fazla ülkeye</strong> ihraç edilmektedir.
                Kalite politikamız doğrultusunda her ürün titiz kalite kontrol süreçlerinden geçirilmektedir.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: "🏆", label: "Kalite Odaklı", desc: "ISO standartları" },
                { icon: "⚙️", label: "Teknik Uzmanlık", desc: "30 yıl deneyim" },
                { icon: "🌍", label: "Global Erişim", desc: "50+ ülke" },
                { icon: "🤝", label: "Güvenilir Destek", desc: "7/24 teknik destek" },
              ].map((v) => (
                <div
                  key={v.label}
                  className="rounded-xl p-4"
                  style={{
                    background: "rgba(249,115,22,0.05)",
                    border: "1px solid rgba(249,115,22,0.1)",
                  }}
                >
                  <div className="text-xl mb-1">{v.icon}</div>
                  <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                    {v.label}
                  </div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>
                    {v.desc}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Logo showcase */}
            <div
              className="rounded-3xl p-8 mb-8 flex items-center justify-center"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                minHeight: "200px",
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <Image
                  src="/images/Logo_huner.jpg"
                  alt="Hüner Logo"
                  width={120}
                  height={80}
                  className="object-contain rounded-lg"
                />
                <div className="text-center">
                  <div
                    className="text-2xl font-black text-gradient"
                  >
                    HÜNER Ltd.
                  </div>
                  <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                    Kaynak Ekipmanları Sanayi ve Ticaret
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative space-y-4">
              <div
                className="absolute left-6 top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, var(--orange), transparent)" }}
              />
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 pl-14 relative"
                >
                  <div
                    className="absolute left-3.5 top-3 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: "var(--orange)",
                      background: "var(--bg)",
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: "var(--orange)" }}
                    />
                  </div>
                  <div
                    className="rounded-xl p-4 flex-1"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div
                      className="text-sm font-bold mb-1 text-gradient"
                    >
                      {m.year}
                    </div>
                    <div className="text-sm" style={{ color: "var(--muted)" }}>
                      {m.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
