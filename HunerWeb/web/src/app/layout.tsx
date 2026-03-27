import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Hüner Ltd. | Kaynak Ekipmanları ve Torç Sistemleri",
  description:
    "Hüner Ltd. — Türkiye'nin önde gelen MIG, TIG torç ve kaynak ekipmanları üreticisi. WEC, WEC-S, AT-DT serisi torçlar, yedek parçalar ve kaynak aksesuarları.",
  keywords: "MIG torç, TIG torç, kaynak ekipmanı, WEC, Hüner, kaynak makinesi",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
