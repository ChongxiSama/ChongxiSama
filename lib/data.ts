export interface TechItem {
  name: string;
  pct: number;
  icon: string;
}

export interface TechGroup {
  title: string;
  items: TechItem[];
}

export const techGroups: TechGroup[] = [
  {
    title: "Frameworks",
    items: [
      { name: "React / Next.js", pct: 75, icon: "nextjs" },
      { name: "React / Vite", pct: 23, icon: "vite" },
      { name: "Vanilla JS", pct: 2, icon: "javascript" },
    ],
  },
  {
    title: "Languages",
    items: [
      { name: "TypeScript / JS", pct: 87, icon: "typescript" },
      { name: "Go", pct: 11, icon: "go" },
      { name: "Rust", pct: 2, icon: "rust" },
    ],
  },
  {
    title: "Platforms",
    items: [
      { name: "Cloudflare", pct: 97, icon: "cloudflare" },
      { name: "Vercel", pct: 3, icon: "vercel" },
    ],
  },
];

export const archive = {
  status: "Non-Collaborative_Entity",
  protocol: "Protocol_V.4.21",
  moeicp: { label: "MoeICP", value: "NO. 20250591", verified: "Verified" },
  statusUrl: "https://status.chongxi.us/",
};
