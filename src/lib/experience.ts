import sngularLogoAsset from "../assets/svg/sngular.svg";
import knackLogoAsset from "../assets/svg/knack.svg";
import freelancerLogoAsset from "../assets/svg/freelancer.svg";
import softecLogoAsset from "../assets/svg/softec.svg";
import diatomeaLogoAsset from "../assets/svg/diatomea.svg";
import funiberLogoAsset from "../assets/svg/funiber.svg";


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
    icon: ImageMetadata;
    iconSize: number;
};

export const experience: ExperienceEntry[] = [
    {
        show: true,
        role: "Expert Frontend Developer",
        company: "Sngular",
        period: "Oct 2025 - Present",
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
        icon: sngularLogoAsset,
        iconSize: 200,
    },
    {
        show: true,
        role: "Frontend Developer",
        company: "Knack",
        period: "Jul 2024 - Jan 2025",
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
        icon: knackLogoAsset,
        iconSize: 200,
    },
    {
        show: true,
        role: "Full-Stack Developer",
        company: "Freelancer",
        period: "Jan 2024 - Jul 2024",
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
        icon: freelancerLogoAsset,
        iconSize: 90,
    },
    {
        show: true,
        role: "Full-Stack Developer",
        company: "Softec.Cloud",
        period: "Mar 2022 - Jan 2024",
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
        icon: softecLogoAsset,
        iconSize: 150,
    },
    {
        show: true,
        role: "Full-Stack Developer",
        company: "Diatomea Technology",
        period: "Jul 2018 - Mar 2022",
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
        icon: diatomeaLogoAsset,
        iconSize: 100,
    },
    {
        show: false,
        role: "Junior Full-Stack Developer",
        company: "FUNIBER",
        period: "Nov 2016 - Jul 2018",
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
        icon: funiberLogoAsset,
        iconSize: 40,
    },
];
