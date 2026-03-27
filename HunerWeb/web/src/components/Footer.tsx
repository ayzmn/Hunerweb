import Image from "next/image";

const LINKS = {
  "Ürünler": ["MIG Torçları", "TIG Torçları", "Plazma Ekipmanları", "Yedek Parça", "Üniteler"],
  "Kurumsal": ["Hakkımızda", "Faaliyet Alanı", "Sertifikalar", "İletişim"],
  "Destek": ["Teknik Destek", "Katalog İndir", "Garanti Koşulları", "SSS"],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#060a10",
        borderTop: "1px solid rgba(249,115,22,0.1)",
      }}
    >
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(249,115,22,0.5), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)" }}
              >
                <Image
                  src="/images/Logo_huner.jpg"
                  alt="Hüner"
                  width={32}
                  height={32}
                  className="rounded object-cover"
                />
              </div>
              <div>
                <div className="font-black text-lg text-white">HÜNER</div>
                <div className="text-xs" style={{ color: "var(--orange)" }}>Kaynak Ekipmanları</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
              1990'dan bu yana Türkiye'nin kaynak sektörüne hizmet veren Hüner Ltd.,
              kaliteli üretim ve güvenilir teknik destekle yanınızda.
            </p>
            {/* Brand logos */}
            <div className="flex gap-3">
              {["/images/Tescil_Huner.png", "/images/Tescil_Dattweld.png", "/images/Tescil_Vec.png"].map((src, i) => (
                <div
                  key={i}
                  className="w-16 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <img src={src} alt="Tescil" className="h-7 object-contain opacity-70" />
                </div>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "var(--orange)" }}
              >
                {title}
              </div>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      className="text-sm text-left transition-colors hover:text-white"
                      style={{ color: "var(--muted)" }}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            color: "var(--muted)",
          }}
        >
          <div>© {year} Hüner Ltd. Şti. Tüm hakları saklıdır.</div>
          <div className="flex gap-6">
            {["Gizlilik Politikası", "Kullanım Koşulları", "Çerez Politikası"].map((t) => (
              <button key={t} className="hover:text-white transition-colors" style={{ color: "var(--muted)" }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
