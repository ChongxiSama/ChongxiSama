import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";
import "material-symbols/rounded.css";
import ClientLayout from "@/components/ClientLayout";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chongxi's Homepage | CEPATO",
  description: "Full Stack Developer, Web3 Researcher & Tech Blogger. Exploration of Web3, SEO, and Android Technology.",
  authors: [{ name: "Chongxi" }],
  icons: {
    icon: "https://github.com/ChongxiSama.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://chongxi.us/#person",
        "name": "Chongxi",
        "alternateName": ["xi", "重熙", "Chongxi3555"],
        "url": "https://chongxi.us/",
        "image": "https://github.com/ChongxiSama.png",
        "identifier": "0009-0007-9348-1534",
        "description": "个人开发者，CEPATO 和 ForestSeCond 的第一负责人。专注于 Web3, SEO 以及 Android 技术研究。",
        "sameAs": [
          "https://xice.cx/",
          "https://mai.chongxi.us/",
          "https://blog.chongxi.us/",
          "https://github.com/ChongxiSama",
          "https://t.me/CEPATECH",
          "https://orcid.org/0009-0007-9348-1534"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://chongxi.us/#website",
        "url": "https://chongxi.us/",
        "name": "Chongxi's Digital Hub",
        "publisher": { "@id": "https://chongxi.us/#person" }
      }
    ]
  };

  return (
    <html lang="zh-CN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${robotoMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}