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

export type ProjectPhaseStatus = "completed" | "current" | "none";

export type ProjectPhase = {
    name: string;
    status: ProjectPhaseStatus;
};

export type Project = {
    slug: string;
    name: string;
    summary: string;
    stages: ProjectPhase[];
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
                stages: [
                    { name: "Concept", status: "completed" },
                    { name: "Development", status: "completed" },
                    { name: "Close beta", status: "current" },
                    { name: "Open beta", status: "none" },
                    { name: "Launch 🚀", status: "none" },
                ],
                image: sonoguides,
                imageAlt: "Habit tracker mobile preview",
                highlights: [
                    "Daily streak timeline with adaptive reminders",
                    "Offline-first check-ins with instant sync",
                    "Weekly insights panel with behavior clusters",
                ],
                details: [
                    "About a year ago, I found myself on a solo trip to Vienna, wandering through the city with no plan or itinerary. I stumbled upon a museum + park with free audio guides by scanning a QR code.",
                    "It barely scratched the surface of the rich history and culture around me, but it sparked a sense of wonder and curiosity that I hadn't felt in a long time.",
                    "Right after that, I ask an AI to generate a guide for the park I was walking in, then I copy that text into a text-to-speech free app (loaded with ads).",
                    "I was amazed by how much more connected I felt to my surroundings just by having a voice narrating the stories and details of the place. It turned a simple walk into an immersive experience, and I wished I had something like that for every place I visited and also being way easy to use.",
                    "Inspired by that experience, I set out to create Sonoguides, a mobile app that brings those serendipitous discoveries to life. The app offers personalized audio guides for any location, allowing users to explore their surroundings in a new and meaningful way.",
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
                stages: [
                    { name: "Concept", status: "completed" },
                    { name: "Development", status: "current" },
                    { name: "Close beta", status: "none" },
                    { name: "Open beta", status: "none" },
                    { name: "Launch 🚀", status: "none" },
                ],
                image: f1lmlog,
                imageAlt: "Meal planner companion preview",
                highlights: [
                    "Household shared plans with version history",
                    "Smart grocery grouping by aisle and budget",
                    "Lightweight pantry recommendations",
                ],
                details: [
                    "As a film photography enthusiast, I'm always learning and correcting my technique. I found myself wishing for a simple way to log my shots, including camera settings, lens choices, and lighting conditions, so I could review them later and learn from my mistakes.",
                    "I tried using a notebook, generic note-taking apps, even dedicated photography apps, but they weren't designed for this purpose and quickly became cumbersome and disorganized.",
                    "Instead of making shooting film more enjoyable, the logging process felt like a chore that added friction to the creative flow. I wanted something that was quick and easy to use, with a clean interface that let me focus on my photography rather than on managing my logs.",
                    "That's why I created F1lmlog, a mobile app that allows film photographers to effortlessly log their shots and build a personalized database of their work. With F1lmlog, you can easily save your camera settings, lens choices, and lighting conditions, and review them later to learn from your successes and mistakes.",
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
                stages: [
                    { name: "Concept", status: "completed" },
                    { name: "Development", status: "current" },
                    { name: "Close beta", status: "none" },
                    { name: "Open beta", status: "none" },
                    { name: "Launch 🚀", status: "none" },
                ],
                image: fitbro,
                imageAlt: "Focus timer mobile preview",
                highlights: [
                    "Custom focus session presets",
                    "Minimal interruption mode",
                    "Weekly concentration trend cards",
                ],
                details: [
                    "Everybody can create a basic fitness app, in fact, everybody is vibe-coding one right now!",
                    "Most of my projects comes from real-life problems I encounter, and this one is no different. As someone who has struggled with following a healthy diet and maintaining a consistent fitness routine, I found myself wishing for a personalized approach to keep on track and reach my goals.",
                    "But FitBro is not a macros or fitness app, it's a goal achiever buddy. It uses AI to provide personalized feedback in order to make you stay on track and reach your fitness goals.",
                    "I know by myself the struggle of tryingy to find the right direction and motivation to keep going, and I wanted to create something that could help with that. FitBro is designed to be a supportive companion on your fitness journey, providing guidance and encouragement along the way.",
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
                stages: [
                    { name: "API Design", status: "completed" },
                    { name: "Development", status: "completed" },
                    { name: "Testing", status: "completed" },
                    { name: "Launch 🚀", status: "completed" },
                ],
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
                stages: [
                    { name: "Concept", status: "completed" },
                    { name: "Development", status: "completed" },
                    { name: "Launch 🚀", status: "completed" },
                ],
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
                stages: [
                    { name: "Design", status: "completed" },
                    { name: "Prototyping", status: "completed" },
                    { name: "Available", status: "completed" },
                ],
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
                stages: [
                    { name: "Planning", status: "completed" },
                    { name: "Construction", status: "completed" },
                    { name: "Exhibition", status: "completed" },
                    { name: "Archived 📁", status: "completed" },
                ],
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
