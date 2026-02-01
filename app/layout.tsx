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
    icon: "https://blog.chongxi.us/images/xi.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head />
      <body
        className={`${plusJakartaSans.variable} ${robotoMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}