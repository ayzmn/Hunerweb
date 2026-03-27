"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CONTACT_INFO = [
  { icon: "📍", label: "Adres", value: "İstanbul, Türkiye" },
  { icon: "📞", label: "Telefon", value: "+90 (212) XXX XX XX" },
  { icon: "✉️", label: "E-posta", value: "info@huner.com.tr" },
  { icon: "🌐", label: "Web", value: "www.huner.com.tr" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="iletisim"
      className="relative py-28 overflow-hidden"
      style={{ background: "#0b1220" }}
    >
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(249,115,22,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-block">İletişim</span>
          <h2
            className="font-black mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--text)" }}
          >
            Bizimle{" "}
            <span className="text-gradient">İletişime Geçin</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
            Ürün soruları, teknik destek veya sipariş için formu doldurun.
            En kısa sürede dönüş yapacağız.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {CONTACT_INFO.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-4 rounded-xl p-4"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "rgba(249,115,22,0.1)" }}
                >
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs font-medium" style={{ color: "var(--muted)" }}>
                    {c.label}
                  </div>
                  <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                    {c.value}
                  </div>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div
              className="rounded-2xl overflow-hidden mt-4"
              style={{ border: "1px solid var(--border)" }}
            >
              <div
                className="h-48 flex items-center justify-center"
                style={{ background: "var(--bg-card)" }}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">🗺️</div>
                  <div className="text-sm" style={{ color: "var(--muted)" }}>
                    İstanbul, Türkiye
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div
              className="rounded-3xl p-8"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>
                    Mesajınız Alındı!
                  </h3>
                  <p style={{ color: "var(--muted)" }}>
                    En kısa sürede size dönüş yapacağız.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 px-6 py-2 rounded-lg text-sm font-semibold"
                    style={{
                      background: "rgba(249,115,22,0.1)",
                      border: "1px solid rgba(249,115,22,0.3)",
                      color: "var(--orange)",
                    }}
                  >
                    Yeni Mesaj Gönder
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: "name", label: "Ad Soyad", type: "text", placeholder: "Adınız" },
                      { key: "phone", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          value={form[f.key as keyof typeof form]}
                          onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                          required
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(249,115,22,0.15)",
                            color: "var(--text)",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "rgba(249,115,22,0.15)";
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>
                      E-posta
                    </label>
                    <input
                      type="email"
                      placeholder="ornek@firma.com"
                      value={form.email}
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(249,115,22,0.15)",
                        color: "var(--text)",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(249,115,22,0.15)";
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>
                      Mesajınız
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Ürün sorusu, fiyat teklifi veya teknik destek talebi..."
                      value={form.message}
                      onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(249,115,22,0.15)",
                        color: "var(--text)",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(249,115,22,0.15)";
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #f97316, #ea580c)",
                      boxShadow: "0 0 25px rgba(249,115,22,0.3)",
                    }}
                  >
                    Mesaj Gönder →
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
