type T = {
  [key: string]: any;
};

export const profile: T = {
  name: "Chongxi",
  role: "ROOT",
  location: "Anchorage, Alaska",
  avatars: [
    "/avatar.webp",
    "/avatar.webp"
  ],
  slogan: [
    { text: "Exploring digital frontiers through " },
    { text: "code", highlighted: true },
    { text: ". An " },
    { text: "individual developer", highlighted: true },
    { text: "." }
  ],
  orcid: {
    id: "0009-0007-9348-1534",
    url: "https://orcid.org/0009-0007-9348-1534",
  },
};

export const allLinks: T[] = [
  { name: "Home", url: "https://chongxi.us", icon: "Home", type: "site", current: true },
  { name: "GitHub", url: "https://github.com/ChongxiSama", icon: "GitHub", type: "social", current: false },
  { name: "Telegram", url: "https://t.me/CEPATECH", icon: "Telegram", type: "social", current: false },
  { name: "Email", url: "mailto:qwq@chongxi.us", icon: "Email", type: "social", current: false },
  { name: "Blog", url: "https://xice.cx", icon: "Blog", type: "site", current: false },
  { name: "Steam", url: "https://steamcommunity.com/id/CEPATO/", icon: "Steam", type: "social", current: false, desc: "CEPATO" },
  { name: "Monitor", url: "https://mai.chongxi.us", icon: "Monitor", type: "site", current: false },
];

export const projects: T[] = [
  {
    title: "Lonetrail",
    description: "A TypeScript project with 17 stars.",
    status: "active",
    tech: ["TypeScript"],
    link: "https://github.com/ChongxiSama/Lonetrail",
    featured: true,
  },
  {
    title: "lanota-score-calculator",
    description: "A web tool for calculating Lanota game scores.",
    status: "done",
    tech: ["TypeScript"],
    link: "https://github.com/ChongxiSama/lanota-score-calculator",
    featured: false,
  },
  {
    title: "blog-OG",
    description: "A TypeScript blog.",
    status: "active",
    tech: ["TypeScript"],
    link: "https://github.com/ChongxiSama/blog-OG",
    featured: false,
  },
];
