// config.ts

type T = {
  [key: string]: any;
};

export const homepageTitle = "Chongxi's Homepage";

// Profile
export const profile: T = {
  name: "Chongxi",
  role: "ROOT",
  location: "Anchorage, Alaska",
  avatars: [
    "https://blog.chongxi.us/images/xi.webp",
    "https://blog.chongxi.us/images/xi.webp"
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

// Social
export const connectLinks: T[] = [
  {
    platform: "GitHub",
    username: "@ChongxiSama",
    url: "https://github.com/ChongxiSama",
    icon: "code",
    color: "primary",
  },
  {
    platform: "Telegram",
    username: "@CEPATECH",
    url: "https://t.me/CEPATECH",
    icon: "send",
    color: "tertiary",
  },
  {
    platform: "Bilibili",
    username: "@CEPATO",
    url: "https://m.bilibili.com/space/500042199",
    icon: "play_circle",
    color: "pink",
  },
  {
    platform: "Email",
    username: "qwq@chongxi.us",
    url: "mailto:qwq@chongxi.us",
    icon: "mail",
    color: "surface",
  },
];

// Personal
export const personalLinks: T[] = [
  {
    platform: "Atlas",
    description: "Personal file storage.",
    url: "https://atlas.chongxi.us",
    icon: "cloud",
  },
  {
    platform: "Spotify",
    description: "Live listening activity.",
    url: "https://spot.chongxi.us",
    icon: "music_note",
    live: true, 
  }
];


// Section
export const sections: T = {
  uplink: "Network Uplink",
  personalNodes: "Personal Nodes",
  repositories: "Repositories",
  logs: "Afterworld Logs",
  dashboard: "Network Status",
};

// Project
export const projects: T[] = [
  {
    title: "CESHRC-A001",
    description: "Material You 3 Style Personal Homepage Website.",
    status: "building...",
    tech: ["Tailwind", "React", "Vite"],
    link: "https://github.com/ChongxiSama/CESHRC-A001",
    featured: true,
  },
];

// Dashboard
export const dashboard: T = {
  servers: [
    { name: "main", url: "https://chongxi.us", connected: true },
    { name: "blog", url: "https://blog.chongxi.us", connected: true },
    { name: "spot", url: "https://spot.chongxi.us", connected: true },
    { name: "NAS", url: "https://void.chongxi.us", connected: false },
  ],
  skills: [
    "JavaScript", "C#", "Go", "Rust", "HTML5", "Astro", "Node.js", 
    "React", "MySQL", "TypeScript", "Hysteria2", "Netlify", "Vercel", "Tailwind"
  ],
};

// Footer
export const footer: T = {
  line1: `© ${new Date().getFullYear()} All Rights Reserved.`,
  line2: "MoeICP-20250591 // END OF LINE",
};