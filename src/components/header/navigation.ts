import { BLOG_ENABLED } from "../../consts";

const NAV_LINKS = [
    { href: "/", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
] as const;

export const HEADER_NAV_LINKS = BLOG_ENABLED
    ? NAV_LINKS
    : NAV_LINKS.filter((link) => link.href !== "/blog");