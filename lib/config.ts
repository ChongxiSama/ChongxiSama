export interface LinkNode {
  name: string;
  url: string;
  tag: string;
  handle: string;
  icon: string;
  current?: boolean;
}

export interface Project {
  title: string;
  description: string;
  status: "active" | "done";
  statusLabel: string;
  tech: string[];
  link: string;
  stars?: number;
}

export interface Profile {
  name: string;
  domain: string;
  role: string;
  orcid: { id: string; url: string };
  motto: string;
  slogan: string;
  node: string;
  avatar: string;
}

export const profile: Profile = {
  name: "Chongxi",
  domain: "chongxi.us",
  role: "Developer · Researcher",
  orcid: {
    id: "0009-0007-9348-1534",
    url: "https://orcid.org/0009-0007-9348-1534",
  },
  motto: "Ad Astra Per Aspera.",
  slogan: "Exploring digital frontiers through code. An individual developer.",
  node: "https://chongxi.us",
  avatar: "/avatar.webp",
};

export const allLinks: LinkNode[] = [
  { name: "Home", url: "https://chongxi.us", tag: "Home", handle: "chongxi.us", icon: "home", current: true },
  { name: "GitHub", url: "https://github.com/ChongxiSama", tag: "Code", handle: "ChongxiSama", icon: "github" },
  { name: "Telegram", url: "https://t.me/CEPATECH", tag: "Social", handle: "t.me/CEPATECH", icon: "telegram" },
  { name: "Email", url: "mailto:qwq@chongxi.us", tag: "Mail", handle: "qwq@chongxi.us", icon: "email" },
  { name: "Blog", url: "https://xice.cx", tag: "Blog", handle: "xice.cx", icon: "blog" },
  {
    name: "Steam",
    url: "https://steamcommunity.com/id/CEPATO/",
    tag: "Game",
    handle: "CEPATO",
    icon: "steam",
  },
  {
    name: "Monitor",
    url: "https://mai.chongxi.us",
    tag: "Monitor",
    handle: "mai.chongxi.us",
    icon: "monitor",
  },
];

export const projects: Project[] = [
  {
    title: "Lonetrail",
    description: "A TypeScript project with 17 stars.",
    status: "active",
    statusLabel: "Active",
    tech: ["TypeScript"],
    link: "https://github.com/ChongxiSama/Lonetrail",
    stars: 17,
  },
  {
    title: "lanota-score-calculator",
    description: "A web tool for calculating Lanota game scores.",
    status: "done",
    statusLabel: "Done",
    tech: ["TypeScript"],
    link: "https://github.com/ChongxiSama/lanota-score-calculator",
  },
  {
    title: "blog-OG",
    description: "A TypeScript blog.",
    status: "active",
    statusLabel: "Active",
    tech: ["TypeScript"],
    link: "https://github.com/ChongxiSama/blog-OG",
  },
];

export const support = {
  title: "Support",
  description: "Buy me a coffee to keep the servers running.",
  cta: "Buy Me A Coffee",
  url: "https://xice.cx/donate/",
};

export const steamProfileUrl = "https://steamcommunity.com/profiles/76561199634347036";
