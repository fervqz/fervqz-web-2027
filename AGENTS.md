# AGENTS.md

This is the personal portfolio and blog of Fernando Vásquez (`fervqz.com`), a static site built with Astro 6, MDX, Tailwind CSS v4 and Astro Content Collections. It is public: everything in the repo and in `dist/` ends up on the internet. Prioritize security, performance, load speed and SEO.

## Working agreements

### 1. Never publish sensitive information

Before every commit, push, build or deploy, check that nothing sensitive is being uploaded or published.

* No secrets, API keys, tokens, passwords or private URLs in the repo, in git history, or in client-side code. `.env` stays gitignored; add every new variable to `.env.example` with a safe placeholder. Only values that are safe to publish may reach the browser (`PUBLIC_*`).
* No personal data beyond what the site intentionally shows (name, GitHub, LinkedIn, work history). No emails, phone numbers, addresses, or private notes in content, comments or `TODO`s.
* Images must have their metadata stripped (EXIF/GPS/author). The pre-commit hook does it for staged images; check any image that lands in `public/` or `src/assets` another way, and check `.glb` files too.
* Review `git diff` and `git status` before committing. Do not commit `.DS_Store`, `.env*`, local drafts or `dist/`.
* Content with `hidden: true`, drafts and placeholder text must never be built into pages, RSS or the sitemap. Replace `example.com` links and `TODO` placeholders before they ship.
* Never claim facts about the author (metrics, employers, dates) that the user has not confirmed.

### 2. Keep the site secure

* Treat every dependency and every piece of input as untrusted. No `innerHTML`, `eval` or `set:html` with anything that is not a constant or sanitized.
* External links with `target="_blank"` need `rel="noopener noreferrer"`.
* Run `rtk pnpm audit` when dependencies change and before a release; fix high and critical findings or say why they can't be fixed. Keep dependencies updated, pin exact versions, and add new ones sparingly (check size, maintenance and licence).
* The site is hosted on **Netlify**. Build settings and security headers live in `netlify.toml` (HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, long-lived cache for `/_astro/*`). A CSP is still to be added; any new inline script or third-party origin needs it updated in the same change. Never put secrets in `netlify.toml`; use Netlify environment variables, and mark anything non-public as secret.
* No analytics, trackers or third-party scripts without the user's explicit approval.
* Any form or endpoint (for example the contact form) must validate input on the server, rate limit, and never expose credentials to the client.

### 3. Delegate by complexity

The main agent is the orchestrator. Delegate bounded work to the opencode MCP by complexity:

| Complexity | Signal                                                                            | Tool to use                 |
|------------|-----------------------------------------------------------------------------------|-----------------------------|
| Trivial    | mechanical edit, rename, boilerplate, format, single-file draft, summarise a file | `opencode_run`              |
| Simple     | small self-contained change, one function, short doc, extraction                  | `opencode_run`              |
| Medium     | multi-file feature slice, refactor within a module, tests for a known spec        | `opencode_run`              |
| Complex    | architecture, cross-cutting design, ambiguous requirements, irreversible changes  | **do it yourself** (Sonnet) |

* Every delegable task goes to `opencode_run`. Use `opencode_run_async` for several independent tasks, then `opencode_done` to collect them. If the outcome is verifiable by reading one artifact, delegate; if it needs judgement across the whole repo, keep it.
* Always keep for yourself: the plan, the final assembly, and anything touching **security, secrets, dependency upgrades, hosting or deploy config, headers/CSP, forms or endpoints**, because a mistake there leaks data or is hard to undo.
* Never trust an agent's chat text. Read the files it produced and run the checks before accepting the work.
* Never send two agents to write the same file in parallel. Always pass an explicit `workdir` inside this project.
* Give each delegated task the context it lacks: the files to touch, the rules in this file, and the check that proves it is done.

### 4. Terminal commands: always use RTK

Prefix **every** terminal command with `rtk` (for example `rtk git status`, `rtk pnpm build`). This keeps command output short. If `rtk` has no filter for a command it passes it through unchanged, so there is no exception.

### 5. Use pnpm, not npm

* Install, run and audit with `pnpm` (`rtk pnpm install`, `rtk pnpm add <pkg>`, `rtk pnpm dev`). Use `pnpm dlx` instead of `npx`.
* Do not create or commit `package-lock.json` or `yarn.lock`; the lockfile is `pnpm-lock.yaml`. The package manager is pinned in the `packageManager` field of `package.json`.
* Keep scripts, hooks (`.husky`), the README and `netlify.toml` on `pnpm`; never reintroduce `npm` commands.

### 5b. Node version: use fnm

* The project runs on **Node 22.23.5** (Astro 6 requires `>=22.23.4`). The version is pinned in `.node-version`, which `fnm` and Netlify both read, and mirrored in `netlify.toml` (`NODE_VERSION`). Change all three together.
* Manage Node with [fnm](https://github.com/Schniz/fnm): `rtk fnm install` and `rtk fnm use` in the repo root pick up `.node-version`. Enable `fnm env --use-on-cd` in the shell so it switches automatically. Do not use nvm, volta or a global Node install.

### 6. Performance, load speed and SEO come first

Every change must keep the site fast and discoverable. Check the effect before and after.

* **Ship less**: static output, minimal client JS. Prefer Astro components over framework islands, and load heavy scripts (like `model-viewer`) only on the page that needs them, lazily.
* **Images**: use `astro:assets` (`<Image>`/`<Picture>`) with explicit `width`/`height`, responsive `sizes`, modern formats, `loading="lazy"` below the fold, and `fetchpriority="high"` only for the LCP image. Compress sources before adding them; no unused or duplicate assets.
* **3D and media**: compress `.glb` files (Draco/meshopt, resized textures) and keep them small; provide a poster and defer loading until interaction or visibility.
* **Fonts**: subset to the needed ranges, limit families and weights, use `font-display: swap`, preload only the critical font.
* **CSS and JS**: no render-blocking third-party resources, no unused dependencies, keep layout stable (avoid CLS) and animations on `transform`/`opacity`. Respect `prefers-reduced-motion`.
* **SEO**: every page has a unique `<title>`, meta description, canonical URL, Open Graph/Twitter image, and valid structured data. Keep `sitemap` and `robots.txt` accurate (no `noindex` pages in the sitemap), use semantic headings (one `h1`), descriptive alt text, and a real 404 page.
* **Measure**: after a meaningful change, run `rtk pnpm build` and compare `dist/` size; run Lighthouse on the changed pages when you touch layout, images or scripts. Targets: LCP under 2.5 s, CLS under 0.1, INP under 200 ms, Lighthouse performance, accessibility and SEO at 95 or more.

### 7. Validate every change

* Before any change, run `rtk pnpm check` and `rtk pnpm build` to know the starting state. If either already fails, say so before touching anything.
* After all changes, run both again, plus `rtk pnpm audit` when dependencies changed. Never commit or report work as done while they fail.
* Do not weaken checks to get a pass: no `@ts-ignore`, no deleting code to silence warnings.
* Verify visual and interactive changes in a browser (`rtk pnpm dev`, then the page itself), on mobile and desktop widths and in both light and dark themes.

### 8. Summarise every change, briefly

After any change to the codebase, tell the user what changed in a short summary: a few bullets or sentences, most important first, no file-by-file lists or code dumps unless asked. Put what needs their attention (risks, things not verified, decisions for them) in its own short section.

## Coding principles

* Prefer the simplest code that does the job. Match the surrounding style, comment density and naming.
* **TypeScript strict mode** and no `any`; use `unknown` plus narrowing for external data.
* Keep functions short (under about 30 lines) and components small and focused. Reusable UI lives in `src/components/ui`, page sections in `src/sections`, data in `src/lib`.
* Style with Tailwind and the design tokens in `src/styles/tokens.css`; no new hard-coded colours.
* Accessibility is not optional: semantic HTML, visible focus, sufficient contrast, keyboard support, alt text.
* **Conventional Commits** (`feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`), imperative mood, subject under 72 characters, no trailing period. Commit each finished change separately, only after the checks pass.
* Do not reformat whole files or the whole repo; touch only the lines you change.

## Commands

```bash
rtk pnpm install      # install dependencies
rtk pnpm dev          # start the dev server
rtk pnpm build        # production build to dist/
rtk pnpm preview      # preview the production build
rtk pnpm check        # astro check (types)
rtk pnpm audit        # dependency vulnerabilities
rtk pnpm format       # prettier
```

## Project notes

* Site metadata lives in `src/consts.ts`; the canonical URL is in `astro.config.mjs`.
* Blog posts are in `src/content/blog/`, project stories in `src/content/projects-content/`, the project list in `src/lib/projects.ts`, work history in `src/lib/experience.ts`.
* `BLOG_ENABLED=false` disables the blog entirely (routes, nav, RSS). See `.env.example`.
