import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["900"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-cn",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Chongxi's Homepage | CEPATO",
  description: "Full Stack Developer, Web3 Researcher & Tech Blogger. Exploration of Web3, SEO, and Android Technology.",
  authors: [{ name: "Chongxi" }],
  icons: {
    icon: "https://github.com/ChongxiSama.png",
  },
  openGraph: {
    title: "Chongxi's Homepage | CEPATO",
    description: "Full Stack Developer, Web3 Researcher & Tech Blogger.",
    url: "https://chongxi.us/",
    siteName: "Chongxi's Digital Hub",
    images: [
      {
        url: "https://github.com/ChongxiSama.png",
        width: 800,
        height: 800,
      },
    ],
    locale: "zh_CN",
    type: "website",
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
    <html lang="zh-CN" className="scroll-smooth overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} ${notoSerifSC.variable} antialiased bg-page min-h-screen overflow-x-hidden`}
      >
        <div className="animate-enter">
          {children}
        </div>
      </body>
    </html>
  );
}
