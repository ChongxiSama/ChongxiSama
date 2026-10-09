import type { Metadata } from "next";
import "./globals.css";

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
    locale: "en_US",
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
        "description": "Independent developer and lead of CEPATO and ForestSeCond. Focused on Web3, SEO and Android research.",
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
    <html
      lang="en-US"
      className="scroll-smooth overflow-x-hidden bg-void"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
