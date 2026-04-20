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
      title: "Comm_Uplink",
      ref: "Uplink_Ref: RL-NOD-0932",
      meta: "Network Intelligence // Active",
      watermark: "Uplink",
      active_label: "● ACTIVE",
      uid_label: "UID: "
    },
    {
      id: 3,
      label: "03",
      title: "Field_Report",
      ref: "Stream_Ref: DATA_PULL_04",
      meta: "RSS Feed // Auto_Sync",
      watermark: "Report",
      sync_label: "SYNCING DATA...",
      date_prefix: "LOG_DATE // "
    },
    {
      id: 4,
      label: "04",
      title: "Tech_Spec",
      ref: "Spec_Ref: ARCH-RL-2026",
      meta: "Development Stack // L-05",
      watermark: "Spec",
      sections: [
        {
          title: "System Architecture",
          items: [
            { name: "React & Next.js", label: "STABLE" },
            { name: "JavaScript & TypeScript", label: "STABLE" },
            { name: "Go & Rust", label: "STABLE" },
            { name: "Solidity", label: "STABLE" }
          ]
        },
        {
          title: "Core Protocol",
          items: [
            { name: "Arch & Dedora", label: "OS" },
            { name: "SEO & RAG", label: "SKILL" },
            { name: "CloudFlare & Vercel", label: "EDGE" }
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
      id: 5,
      label: "05",
      title: "Project",
      ref: "Proj_Ref: CESHRC-A001",
      meta: "Engineering Logs // Active",
      watermark: "Projects",
      deployment_label: "Deployment"
    }
  ]
};

export type SiteData = typeof siteData;
