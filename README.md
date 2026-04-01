# Fervqz Web v2

Personal portfolio and blog built with Astro, MDX, Tailwind CSS v4, and Astro Content Collections.

## Tech Stack

- Astro
- Tailwind CSS v4
- MDX
- Astro Content Collections
- Astro Icon
- GSAP

## Scripts

| Command            | Action                                    |
| :----------------- | :---------------------------------------- |
| `npm install`      | Install dependencies                      |
| `npm run dev`      | Start development server                  |
| `npm run dev:host` | Start development server on local network |
| `npm run build`    | Build production output                   |
| `npm run preview`  | Preview production build locally          |
| `npm run astro`    | Run Astro CLI commands                    |

## Content

- Blog posts live in `src/content/blog/` (`.md` and `.mdx`).
- Frontmatter schema is defined in `src/content.config.ts`.

## Project Structure

```text
src/
	components/
		header/
		sticker/
		ui/
	content/
		blog/
	layouts/
	pages/
	styles/
```

## Notes

- Site metadata constants are in `src/consts.ts`.
- Canonical site URL is configured in `astro.config.mjs`.
