export type ExperienceEntry = {
    show: boolean;
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    highlights: string[];
    stack: string[];
    type: "full-time" | "part-time" | "freelance";
};

export const experience: ExperienceEntry[] = [
    {
        show: true,
        role: "Expert Frontend Developer",
        company: "Sngular",
        period: "2025 - Present",
        location: "Remote",
        type: "full-time",
        description:
            "Lead frontend development for a SaaS analytics platform serving 50k+ users. Drove a full design-system migration and mentored a team of 4 engineers.",
        highlights: [
            "Reduced bundle size by 42% through code splitting and lazy loading",
            "Built a real-time dashboard with WebSockets and React Query",
            "Established component library used across 3 product teams",
        ],
        stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "GraphQL"],
    },
    {
        show: true,
        role: "Frontend Developer",
        company: "Knack",
        period: "Mar 2021 - Dec 2022",
        location: "Remote",
        type: "full-time",
        description:
            "Developed client-facing web apps and marketing sites for mid-size brands. Collaborated directly with designers to ship pixel-perfect experiences.",
        highlights: [
            "Delivered 12 client projects on time and within scope",
            "Introduced Storybook, cutting QA cycles by 30%",
            "Migrated legacy jQuery codebase to Vue 3",
        ],
        stack: ["Vue 3", "Nuxt", "SCSS", "Storybook", "Figma"],
    },
    {
        show: true,
        role: "Full-Stack Developer",
        company: "Freelancer",
        period: "Jun 2019 - Feb 2021",
        location: "Remote",
        type: "freelance",
        description:
            "Contracted to build interactive data visualisations and internal tooling for a fintech startup's operations team.",
        highlights: [
            "Built D3.js charts consumed by 200+ daily active ops agents",
            "Integrated with REST and gRPC back-ends",
            "Improved Lighthouse performance score from 54 to 91",
        ],
        stack: ["D3.js", "React", "Node.js", "PostgreSQL"],
    },
    {
        show: true,
        role: "Full-Stack Developer",
        company: "Softec.Cloud",
        period: "Sep 2017 - May 2019",
        location: "Remote",
        type: "full-time",
        description:
            "Designed and developed websites and e-commerce stores for small businesses and creative agencies.",
        highlights: [
            "Launched 20+ WordPress and Shopify stores",
            "Created custom Liquid themes and WooCommerce plugins",
            "Grew referral revenue by building a recurring client base",
        ],
        stack: ["WordPress", "Shopify", "JavaScript", "PHP", "CSS"],
    },
    {
        show: true,
        role: "Full-Stack Developer",
        company: "Diatomea Technology",
        period: "Sep 2017 - May 2019",
        location: "Remote",
        type: "full-time",
        description:
            "Designed and developed websites and e-commerce stores for small businesses and creative agencies.",
        highlights: [
            "Launched 20+ WordPress and Shopify stores",
            "Created custom Liquid themes and WooCommerce plugins",
            "Grew referral revenue by building a recurring client base",
        ],
        stack: ["WordPress", "Shopify", "JavaScript", "PHP", "CSS"],
    },
    {
        show: false,
        role: "Junior Full-Stack Developer",
        company: "FUNIBER",
        period: "Sep 2017 - May 2019",
        location: "Remote",
        type: "part-time",
        description:
            "Designed and developed websites and e-commerce stores for small businesses and creative agencies.",
        highlights: [
            "Launched 20+ WordPress and Shopify stores",
            "Created custom Liquid themes and WooCommerce plugins",
            "Grew referral revenue by building a recurring client base",
        ],
        stack: ["WordPress", "Shopify", "JavaScript", "PHP", "CSS"],
    },
];
