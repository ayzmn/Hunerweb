"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AltGrupNode } from "@/types/product";

interface Props {
  altGrup: AltGrupNode;
  onClose: () => void;
}

export default function ExplosionView({ altGrup, onClose }: Props) {
  const products = altGrup.products;
  const [imgError, setImgError] = useState(false);
  const showImage = altGrup.image && !imgError;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
      >
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-3xl p-8"
          initial={{ scale: 0.6, opacity: 0, rotateX: -15 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "linear-gradient(135deg, #0f1624, #151e30)",
            border: "1px solid rgba(249,115,22,0.4)",
            boxShadow: "0 0 60px rgba(249,115,22,0.15)",
          }}
        >
          {/* Header */}
          <div className="flex items-start gap-5 mb-8">
            {/* AltGrup image */}
            {showImage && (
              <div
                className="flex-shrink-0 w-36 h-36 rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(249,115,22,0.25)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={altGrup.image}
                  alt={altGrup.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              </div>
            )}

            {/* Title + specs */}
            <div className="flex-1 min-w-0">

              <h3 className="text-2xl font-black text-gradient mb-1">{altGrup.name}</h3>

              {/* Teknik özellikler */}
              {altGrup.ozellik && (
                <div
                  className="rounded-lg px-4 py-3 space-y-0.5"
                  style={{
                    background: "rgba(249,115,22,0.06)",
                    border: "1px solid rgba(249,115,22,0.15)",
                  }}
                >
                  {altGrup.ozellik.split("\n").filter(Boolean).map((line, i) => (
                    <p
                      key={i}
                      className="text-xs leading-5"
                      style={{ color: i === 0 ? "var(--orange)" : "var(--muted)" }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110"
              style={{
                background: "rgba(249,115,22,0.1)",
                border: "1px solid rgba(249,115,22,0.3)",
                color: "var(--orange)",
              }}
            >
              ✕
            </button>
          </div>

          {/* Explosion grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((p, i) => {
              const angle = (i / products.length) * 360;
              const radius = 60;
              const tx = Math.cos((angle * Math.PI) / 180) * radius;
              const ty = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <motion.div
                  key={p.UrunKod}
                  initial={{ opacity: 0, x: tx, y: ty, scale: 0.3 }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: i * 0.04,
                  }}
                  className="rounded-xl p-4"
                  style={{
                    background: "rgba(249,115,22,0.04)",
                    border: "1px solid rgba(249,115,22,0.12)",
                  }}
                  whileHover={{
                    scale: 1.03,
                    borderColor: "rgba(249,115,22,0.5)",
                    background: "rgba(249,115,22,0.08)",
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className="text-xs font-mono font-bold px-2 py-1 rounded"
                      style={{ background: "rgba(249,115,22,0.15)", color: "var(--orange)" }}
                    >
                      {p.UrunKod}
                    </span>
                    {p.Fiyat && p.Fiyat !== "" && (
                      <span className="text-xs font-semibold" style={{ color: "var(--amber)" }}>
                        {p.Fiyat}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    {p.Aciklama}
                  </p>
                  {p.KullananUrunKod && (
                    <div className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
                      Uyumlu:{" "}
                      <span style={{ color: "rgba(249,115,22,0.7)" }}>{p.KullananUrunKod}</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <div
            className="mt-6 pt-6 text-center text-xs"
            style={{ borderTop: "1px solid rgba(249,115,22,0.1)", color: "var(--muted)" }}
          >
            Fiyat bilgisi için lütfen{" "}
            <button
              onClick={() => {
                onClose();
                setTimeout(
                  () => document.getElementById("iletisim")?.scrollIntoView({ behavior: "smooth" }),
                  300
                );
              }}
              className="underline"
              style={{ color: "var(--orange)" }}
            >
              iletişime geçin
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
