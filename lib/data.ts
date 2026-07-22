export const siteData = {
  global: {
    utc_label: "CEPATO",
    brand_label: "CHONGXI",
    footer_text: "Rhine Lab Personnel Archive // END OF LINE"
  },
  chapters: [
    {
      id: 1,
      label: "01",
      title: "Subject_Personnel",
      ref: "Archive_Ref: CEPATO-3555",
      meta: "Rhine Lab Pioneer // Sector-04",
      watermark: "Data",
      content: {
        clearance: "ROOT",
        orcid_prefix: "ORCID ",
        role_prefix: ".",
        role: "US",
        tags: ["Developer", "Researcher"],
        briefing_title: "Subject Briefing",
        slogan_main: "Ad Astra Per Aspera",
        slogan: [
          { text: "Exploring digital frontiers through ", highlight: false },
          { text: "code", highlight: true },
          { text: ". An ", highlight: false },
          { text: "individual developer", highlight: true },
          { text: ".", highlight: false }
        ],
        monitor_title: "Signal_Monitor"
      }
    },
    {
      id: 2,
      label: "02",
      title: "Network_Map",
      ref: "Net_Ref: RL-NOD-0932",
      meta: "Network Topology // Active",
      watermark: "Network"
    },
    {
      id: 3,
      label: "03",
      title: "Tech_Spec",
      ref: "Spec_Ref: ARCH-RL-2026",
      meta: "Development Stack // L-05",
      watermark: "Spec",
      tech_groups: [
        {
          title: "Frameworks",
          items: [
            { name: "React / Next.js", pct: 75 },
            { name: "React / Vite", pct: 23 },
            { name: "Vanilla JS", pct: 2 }
          ]
        },
        {
          title: "Languages",
          items: [
            { name: "TypeScript / JS", pct: 87 },
            { name: "Go", pct: 11 },
            { name: "Rust", pct: 2 }
          ]
        },
        {
          title: "Platforms",
          items: [
            { name: "Cloudflare", pct: 97 },
            { name: "Vercel", pct: 3 }
          ]
        }
      ],
      archive_id: {
        label: "MoeICP",
        value: "NO. 20250591",
        clearance_label: "Status",
        clearance_value: "Verified"
      }
    },
    {
      id: 4,
      label: "04",
      title: "Project",
      ref: "Proj_Ref: CESHRC-A001",
      meta: "Engineering Logs // Active",
      watermark: "Projects",
      deployment_label: "Deployment"
    }
  ]
};

export type SiteData = typeof siteData;

export type Chapter = typeof siteData['chapters'][number];
