"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Product, UstGrupNode, AltGrupNode } from "@/types/product";
import { buildHierarchy, groupByAnaKategori, ANA_KATEGORI_LABELS } from "@/lib/products";
import ExplosionView from "./ExplosionView";

const ANA_KATEGORI_ICONS: Record<string, string> = {
  MIG: "🔵",
  TIG: "🔴",
  YP: "🔧",
  UNITE: "⚙️",
  PLAZMA: "⚡",
};

const ANA_KATEGORI_DESC: Record<string, string> = {
  MIG: "Metal İnert Gaz kaynak torçları. Seri üretime uygun, yüksek verimli.",
  TIG: "Tungsten İnert Gaz torçları. Hassas, temiz kaynak için ideal.",
  YP: "MIG, TIG ve plazma torçlarına özel orijinal yedek parçalar.",
  UNITE: "CO2 ısıtıcı, su soğutma, elektronik kart ve gaz valfleri.",
  PLAZMA: "Plazma kesim torçlarına uyumlu elektrot, meme ve aksesuarlar.",
};

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hierarchy, setHierarchy] = useState<Record<string, UstGrupNode[]>>({});
  const [loading, setLoading] = useState(true);

  // Selection state: 3 levels
  const [selectedAna, setSelectedAna] = useState<string | null>(null);
  const [selectedUst, setSelectedUst] = useState<UstGrupNode | null>(null);
  const [selectedAlt, setSelectedAlt] = useState<AltGrupNode | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  useEffect(() => {
    fetch("/Urunler.json")
      .then((r) => r.json())
      .then((data: Product[]) => {
        setProducts(data);
        const h = buildHierarchy(data);
        setHierarchy(groupByAnaKategori(h));
        setLoading(false);
      });
  }, []);

  const anaKeys = Object.keys(ANA_KATEGORI_LABELS);

  return (
    <section
      id="urunler"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* bg decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-4 inline-block">Ürün Kataloğu</span>
          <h2
            className="font-black mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--text)" }}
          >
            <span className="text-gradient">500+</span> Ürün Çeşidi
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: "var(--muted)" }}>
            Kategori seçin, modeli inceleyin, bileşenlere patlamalı görünümle ulaşın.
          </p>
        </motion.div>

        {/* ── LEVEL 1: Ana Kategoriler ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10"
        >
          {anaKeys.map((key, i) => {
            const isActive = selectedAna === key;
            return (
              <motion.button
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => {
                  setSelectedAna(isActive ? null : key);
                  setSelectedUst(null);
                  setSelectedAlt(null);
                }}
                className="rounded-2xl p-5 text-center transition-all duration-300 focus:outline-none"
                style={{
                  background: isActive ? "rgba(249,115,22,0.15)" : "var(--bg-card)",
                  border: isActive
                    ? "1px solid rgba(249,115,22,0.6)"
                    : "1px solid var(--border)",
                  boxShadow: isActive ? "0 0 30px rgba(249,115,22,0.2)" : "none",
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="text-3xl mb-2">{ANA_KATEGORI_ICONS[key]}</div>
                <div
                  className="font-bold text-sm"
                  style={{ color: isActive ? "var(--orange)" : "var(--text)" }}
                >
                  {ANA_KATEGORI_LABELS[key]}
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                  {hierarchy[key]?.length || 0} seri
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Ana kategori açıklaması */}
        <AnimatePresence mode="wait">
          {selectedAna && (
            <motion.div
              key={selectedAna + "_desc"}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div
                className="rounded-xl px-6 py-4 flex items-center gap-3"
                style={{
                  background: "rgba(249,115,22,0.05)",
                  border: "1px solid rgba(249,115,22,0.15)",
                }}
              >
                <span className="text-2xl">{ANA_KATEGORI_ICONS[selectedAna]}</span>
                <div>
                  <div className="font-semibold" style={{ color: "var(--text)" }}>
                    {ANA_KATEGORI_LABELS[selectedAna]}
                  </div>
                  <div className="text-sm" style={{ color: "var(--muted)" }}>
                    {ANA_KATEGORI_DESC[selectedAna]}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── LEVEL 2: Ürün Serileri (USTGrup) ── */}
        <AnimatePresence mode="wait">
          {selectedAna && hierarchy[selectedAna] && (
            <motion.div
              key={selectedAna}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mb-10"
            >
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>
                Ürün Serileri
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {hierarchy[selectedAna].map((ust, i) => {
                  const isActive = selectedUst?.key === ust.key;
                  return (
                    <motion.button
                      key={ust.key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => {
                        setSelectedUst(isActive ? null : ust);
                        setSelectedAlt(null);
                      }}
                      className="rounded-2xl overflow-hidden text-left group transition-all duration-300 focus:outline-none"
                      style={{
                        background: isActive ? "rgba(249,115,22,0.12)" : "var(--bg-card)",
                        border: isActive
                          ? "1px solid rgba(249,115,22,0.5)"
                          : "1px solid var(--border)",
                        boxShadow: isActive ? "0 0 20px rgba(249,115,22,0.15)" : "none",
                      }}
                      whileHover={{ y: -3 }}
                    >
                      {/* Image */}
                      {ust.image && (
                        <div className="relative h-36 overflow-hidden">
                          <Image
                            src={ust.image}
                            alt={ust.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div
                            className="absolute inset-0"
                            style={{
                              background: "linear-gradient(to top, rgba(8,12,20,0.9) 0%, transparent 60%)",
                            }}
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div
                          className="font-bold text-sm mb-1"
                          style={{ color: isActive ? "var(--orange)" : "var(--text)" }}
                        >
                          {ust.name}
                        </div>
                        <div className="text-xs" style={{ color: "var(--muted)" }}>
                          {ust.grups.reduce((acc, g) => acc + g.altGrups.length, 0)} model
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── LEVEL 3: Alt Modeller (ALTGrup) ── */}
        <AnimatePresence mode="wait">
          {selectedUst && (
            <motion.div
              key={selectedUst.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>
                Modeller — {selectedUst.name}
              </div>
              <div className="space-y-6">
                {selectedUst.grups.map((grup) => (
                  <div key={grup.key}>
                    {selectedUst.grups.length > 1 && (
                      <div className="text-sm font-semibold mb-3" style={{ color: "var(--orange)" }}>
                        {grup.name}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {grup.altGrups.map((alt, i) => {
                        const isSelected = selectedAlt?.key === alt.key;
                        return (
                          <motion.div
                            key={alt.key}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="relative rounded-xl p-4 cursor-pointer group"
                            style={{
                              background: isSelected
                                ? "rgba(249,115,22,0.12)"
                                : "var(--bg-card)",
                              border: isSelected
                                ? "1px solid rgba(249,115,22,0.5)"
                                : "1px solid var(--border)",
                            }}
                            onMouseEnter={() => setHoveredProduct(alt.key)}
                            onMouseLeave={() => setHoveredProduct(null)}
                            whileHover={{ scale: 1.02, y: -2 }}
                          >
                            <div
                              className="font-bold text-sm mb-1"
                              style={{ color: "var(--text)" }}
                            >
                              {alt.name}
                            </div>
                            <div className="text-xs mb-3" style={{ color: "var(--muted)" }}>
                              {alt.products.length} parça
                            </div>

                            {/* Product preview on hover */}
                            <AnimatePresence>
                              {hoveredProduct === alt.key && (
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  className="mb-3 space-y-1"
                                >
                                  {alt.products.slice(0, 3).map((p) => (
                                    <div
                                      key={p.UrunKod}
                                      className="text-xs flex justify-between items-center py-1 px-2 rounded"
                                      style={{
                                        background: "rgba(249,115,22,0.07)",
                                        color: "rgba(241,245,249,0.7)",
                                      }}
                                    >
                                      <span className="font-mono text-xs" style={{ color: "var(--orange)" }}>
                                        {p.UrunKod}
                                      </span>
                                      <span className="truncate ml-2">{p.Aciklama.slice(0, 20)}…</span>
                                    </div>
                                  ))}
                                  {alt.products.length > 3 && (
                                    <div className="text-xs text-center" style={{ color: "var(--muted)" }}>
                                      +{alt.products.length - 3} daha
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Explosion button */}
                            <button
                              onClick={() => setSelectedAlt(alt)}
                              className="w-full py-2 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105"
                              style={{
                                background: "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(249,115,22,0.1))",
                                border: "1px solid rgba(249,115,22,0.3)",
                                color: "var(--orange)",
                              }}
                            >
                              💥 Patlamalı Görünüm
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!selectedAna && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
            style={{ color: "var(--muted)" }}
          >
            <div className="text-5xl mb-4">☝️</div>
            <div className="text-lg font-medium">Bir kategori seçerek başlayın</div>
          </motion.div>
        )}
      </div>

      {/* Explosion modal */}
      <AnimatePresence>
        {selectedAlt && (
          <ExplosionView altGrup={selectedAlt} onClose={() => setSelectedAlt(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
