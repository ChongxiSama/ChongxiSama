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
  linkLabel?: string;
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
    description: "A minimal Astro blog template — static output, bilingual, configured with YAML.",
    status: "active",
    statusLabel: "Active",
    tech: ["Astro", "TypeScript"],
    link: "https://github.com/ChongxiSama/Lonetrail",
    stars: 22,
  },
  {
    title: "nonebot-plugin-maimaimonitor",
    description: "A NoneBot2 plugin that reports and queries maimai DX server status in group chats.",
    status: "active",
    statusLabel: "Active",
    tech: ["Python"],
    link: "https://github.com/CEPATECH/nonebot-plugin-maimaimonitor",
    stars: 14,
  },
  {
    title: "CESHRC-A001",
    description: "Material You 3 style personal homepage built with React, Vite and Tailwind.",
    status: "done",
    statusLabel: "Done",
    tech: ["TypeScript"],
    link: "https://github.com/ChongxiSama/CESHRC-A001",
    stars: 1,
  },
  {
    title: "isMaiDown",
    description: "Live status board for maimai DX servers.",
    status: "active",
    statusLabel: "Active",
    tech: ["React", "Vite", "TypeScript"],
    link: "https://mai.chongxi.us/",
    linkLabel: "Visit →",
  },
];

export const support = {
  title: "Support",
  description: "Buy me a coffee to keep the servers running.",
  cta: "Buy Me A Coffee",
  url: "https://xice.cx/donate/",
};

export const steamProfileUrl = "https://steamcommunity.com/profiles/76561199634347036";

export const blogUrl = "https://xice.cx";

export const blogAboutUrl = "https://xice.cx/en/about/";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Signals", href: "#signals" },
  { label: "Links", href: "#links" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
];

export interface AboutMetaItem {
  label: string;
  value: string;
}

export interface AboutLink {
  label: string;
  url: string;
}

export interface AboutSubsection {
  title: string;
  paragraphs: string[];
  links?: AboutLink[];
}

export interface AboutSection {
  id: string;
  title: string;
  paragraphs: string[];
  subsections?: AboutSubsection[];
  links?: AboutLink[];
}

export interface AboutContent {
  meta: AboutMetaItem[];
  sections: AboutSection[];
}

export const about: AboutContent = {
  meta: [
    { label: "ORCID", value: "0009-0007-9348-1534" },
    { label: "TIMEZONE", value: "UTC-9" },
    { label: "LANGUAGE", value: "zh-CN / en-US" },
    { label: "DOMAIN", value: "chongxi.us" },
  ],
  sections: [
    {
      id: "01",
      title: "Identity",
      paragraphs: [
        "Chongxi — formerly written as xi, meaning 「重熙」(chóng xī, \"renewed prosperity\") — also goes by Chongxi3555 where ambiguity is possible. The ORCID iD 0009-0007-9348-1534 is used as a unique identifier.",
        "Independent developer, lead of CEPATO and ForestSeCond, principal operator of chongxi.us and its subdomains, and the main author and operator of this site.",
        "Commonly used languages are Simplified Chinese and English (United States); timezone UTC-9.",
      ],
      subsections: [
        {
          title: "Joint attribution",
          paragraphs: [
            "Because Chongxi is the lead of CEPATO, most work is credited jointly as Chongxi & CEPATO.",
          ],
        },
      ],
    },
    {
      id: "02",
      title: "Organization",
      paragraphs: [
        "CEPATO is defined as an aggregator brand. All products and content from ForestSeCond TEAM are currently published under the CEPATO name, as one umbrella entity.",
        "\"cepat\" means rapid; the O stands for Origin. Together they mark this as the root of the whole team's operation.",
      ],
      subsections: [
        {
          title: "Current projects",
          paragraphs: [],
          links: [
            { label: "maimai server status monitor", url: "https://mai.chongxi.us/" },
          ],
        },
        {
          title: "ForestSeCond",
          paragraphs: [
            "The team that operates the CEPATO brand. The name means \"everlasting forest,\" and SeCond refers to time. Abbreviated FSC.",
          ],
        },
        {
          title: "CEPATO variants",
          paragraphs: [
            "CEPATECH — a micro-engine under the CEPATO name. When you see CEPATECH credited on one of our projects, it means that project is driven by this micro-engine.",
            "CE- — CE is the prefix used to represent CEPATO. CESHRC, for example, is the name of one of our projects; starting with CE marks it as belonging to CEPATO.",
          ],
        },
      ],
    },
    {
      id: "03",
      title: "Site",
      paragraphs: [
        "chongxi.us is the identity root of Chongxi & CEPATO: the canonical person record referenced by the sites on this domain, and the source of the live signals the blog reads from.",
        "The design system behind these pages is CEPATO UI — 1980s NASA: brutalism, industrial typography, and a little Swiss style, heavily influenced by the Lone Trail event in Arknights.",
        "Writing lives at xice.cx, a quieter paper-coloured space for long-form posts and essays.",
      ],
      links: [{ label: "Read the full about on xice.cx", url: blogAboutUrl }],
    },
  ],
};
