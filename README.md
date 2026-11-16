# Fervqz Web

Personal portfolio and blog built with Astro, MDX, Tailwind CSS v4, and Astro Content Collections.

## Tech Stack

- Astro
- Tailwind CSS v4
- MDX
- Astro Content Collections
- Astro Icon

## Setup

- Node version is pinned in `.node-version` and managed with [fnm](https://github.com/Schniz/fnm) (`fnm use`).
- Package manager is pnpm.
- Deployed on Netlify; build settings and headers live in `netlify.toml`.

## Scripts

| Command                 | Action                                    |
| :---------------------- | :---------------------------------------- |
| `pnpm install`          | Install dependencies                      |
| `pnpm dev`              | Start development server                  |
| `pnpm dev:host`         | Start development server on local network |
| `pnpm build`            | Build production output                   |
| `pnpm preview`          | Preview production build locally          |
| `pnpm precommit:images` | Strip metadata from staged images         |
| `pnpm astro`            | Run Astro CLI commands                    |

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
- A pre-commit hook strips EXIF/IPTC/XMP metadata from staged raster images.
