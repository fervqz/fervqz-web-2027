import type { ImageMetadata } from "astro";

import sonoguides from "../assets/sonoguides.png";
import f1lmlog from "../assets/f1lmlog-1.png";
import fitbro from "../assets/fitbro.png";
import clonify from "../assets/clonify.webp";
import jas from "../assets/jas.webp";
import dripper from "../assets/dripper.png";
import drivingSimulator from "../assets/driving-simulator.png";

export type ProjectAction = {
    label: "Download" | "Visit" | "Visit landing";
    href: string;
};

export type ProjectStage = "Concept" | "Prototype" | "Live";

export type Project = {
    slug: string;
    name: string;
    summary: string;
    stage: ProjectStage;
    stack: string[];
    highlights: string[];
    details: string[];
    image: ImageMetadata;
    imageAlt: string;
    actions: ProjectAction[];
};

export type ProjectSection = {
    slug: string;
    title: string;
    subtitle: string;
    image: ImageMetadata;
    imageAlt: string;
    projects: Project[];
};

export const projectSections: ProjectSection[] = [
    {
        slug: "software",
        title: "Mobile and Web Apps",
        subtitle: "Software that I wanted to use but didn't exist yet, so I built it myself.",
        image: sonoguides,
        imageAlt: "Mobile app placeholder preview",
        projects: [
            {
                slug: "sonoguides",
                name: "Sonoguides",
                summary: "Hear the stories behind places, Sonoguides allows you to listen to audioguides everywhere you go, with personalized recommendations and offline access.",
                stack: ["React Native", "Expo", "Supabase"],
                stage: "Prototype",
                image: sonoguides,
                imageAlt: "Habit tracker mobile preview",
                highlights: [
                    "Daily streak timeline with adaptive reminders",
                    "Offline-first check-ins with instant sync",
                    "Weekly insights panel with behavior clusters",
                ],
                details: [
                    "This placeholder concept explores a focused mobile flow where each interaction is optimized for quick completion in under 20 seconds.",
                    "The product direction emphasizes retention through thoughtful nudges, frictionless check-ins, and a calm visual system for progress tracking.",
                ],
                actions: [
                    { label: "Download", href: "https://example.com/mobile/habit-tracker" },
                    {
                        label: "Visit landing",
                        href: "https://example.com/mobile/habit-tracker/landing",
                    },
                ],
            },
            {
                slug: "f1lmlog",
                name: "F1lmlog",
                summary: "Save your camera settings, lens choices, and lighting conditions with F1lmlog, the ultimate companion app for film photographers to log their shots and build a personalized database of their work.",
                stack: ["React Native", "Expo", "SQLite"],
                stage: "Concept",
                image: f1lmlog,
                imageAlt: "Meal planner companion preview",
                highlights: [
                    "Household shared plans with version history",
                    "Smart grocery grouping by aisle and budget",
                    "Lightweight pantry recommendations",
                ],
                details: [
                    "This concept is centered around reducing planning overhead for households that batch cook or coordinate meals across multiple schedules.",
                    "The experience is designed to remain useful with sparse input, offering practical suggestions without requiring rigid setup.",
                ],
                actions: [
                    { label: "Download", href: "https://example.com/mobile/meal-planner" },
                    { label: "Visit", href: "https://example.com/mobile/meal-planner/changelog" },
                    {
                        label: "Visit landing",
                        href: "https://example.com/mobile/meal-planner/landing",
                    },
                ],
            },
            {
                slug: "fitbro",
                name: "FitBro",
                summary: "Not another macro app, but a goal achiever buddy. Reach your fitness goals with the help of AI. FitBro helps you keep on track with your fitness journey by providing personalized feedback on diet and workouts.",
                stack: ["React Native", "Expo", "Supabase"],
                stage: "Prototype",
                image: fitbro,
                imageAlt: "Focus timer mobile preview",
                highlights: [
                    "Custom focus session presets",
                    "Minimal interruption mode",
                    "Weekly concentration trend cards",
                ],
                details: [
                    "This concept explores a frictionless timer that encourages deep work without adding UI complexity.",
                    "The interaction model prioritizes one-tap starts and glanceable progress feedback.",
                ],
                actions: [
                    { label: "Download", href: "https://example.com/mobile/focus-timer" },
                    { label: "Visit", href: "https://example.com/mobile/focus-timer/docs" },
                    {
                        label: "Visit landing",
                        href: "https://example.com/mobile/focus-timer/landing",
                    },
                ],
            },
            {
                slug: "just-a-stream",
                name: "@fervqz/just-a-stream",
                summary: "A light weight js library for creating, transforming and merging streams.",
                stack: ["JavaScript", "TypeScript"],
                stage: "Prototype",
                image: jas,
                imageAlt: "Focus timer mobile preview",
                highlights: [
                    "Custom focus session presets",
                    "Minimal interruption mode",
                    "Weekly concentration trend cards",
                ],
                details: [
                    "This concept explores a frictionless timer that encourages deep work without adding UI complexity.",
                    "The interaction model prioritizes one-tap starts and glanceable progress feedback.",
                ],
                actions: [
                    { label: "Download", href: "https://example.com/mobile/focus-timer" },
                    { label: "Visit", href: "https://example.com/mobile/focus-timer/docs" },
                    {
                        label: "Visit landing",
                        href: "https://example.com/mobile/focus-timer/landing",
                    },
                ],
            },
            {
                slug: "clonify",
                name: "UI Studies",
                summary:
                    "The best way of learning is by copying. This is a collection of UI clones from popular apps, rebuilt with clean code and modern best practices for educational purposes.",
                stack: ["Astro", "Tailwind CSS", "React"],
                stage: "Prototype",
                image: clonify,
                imageAlt: "Focus timer mobile preview",
                highlights: [
                    "Custom focus session presets",
                    "Minimal interruption mode",
                    "Weekly concentration trend cards",
                ],
                details: [
                    "This concept explores a frictionless timer that encourages deep work without adding UI complexity.",
                    "The interaction model prioritizes one-tap starts and glanceable progress feedback.",
                ],
                actions: [
                    { label: "Download", href: "https://example.com/mobile/focus-timer" },
                    { label: "Visit", href: "https://example.com/mobile/focus-timer/docs" },
                    {
                        label: "Visit landing",
                        href: "https://example.com/mobile/focus-timer/landing",
                    },
                ],
            },
        ],
    },
    {
        slug: "hardware",
        title: "Physical Products",
        subtitle: "Real-world products that solve real-world problems.",
        image: dripper,
        imageAlt: "Web app placeholder preview",
        projects: [
            {
                slug: "v60-dripper",
                name: "Coffee Dripper",
                summary:
                    "A dripper for a Hario's V60 coffee maker.",
                stack: ["3D Printing", "Fusion 360"],
                stage: "Live",
                image: dripper,
                imageAlt: "Operations dashboard preview",
                highlights: [
                    "SLA heatmaps and incident drill-downs",
                    "Composable dashboards per team role",
                    "Near real-time alert correlation",
                ],
                details: [
                    "This placeholder project simulates a dashboard environment where leadership and operations teams share a single source of operational truth.",
                    "It prioritizes high signal density while preserving readability, using strong hierarchy and clear status semantics.",
                ],
                actions: [],
            },
            {
                slug: "driving-simulator",
                name: "Driving Simulator",
                summary:
                    "A placeholder multi-tenant portal with invoice history, status updates, and role-based document access.",
                stack: ["Arduino", "Custom circuitry", "Pneumatic Actuators", "Custom Steel Frame"],
                stage: "Prototype",
                image: drivingSimulator,
                imageAlt: "Client portal starter preview",
                highlights: [
                    "Tenant-aware navigation and data access",
                    "Project status timeline with audit events",
                    "Secure file vault and approvals",
                ],
                details: [
                    "This concept is a baseline product shell for agencies and B2B teams that need a polished client-facing experience quickly.",
                    "The architecture leaves room for role policies, white-labeling, and modular billing workflows.",
                ],
                actions: [],
            },
        ],
    },
];
