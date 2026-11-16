# TODO

Findings from the repo review, ordered by priority. Tick items off as they land.

## Before launch (blockers)

- [ ] **Contact form does nothing.** `src/sections/ContactDetailsSection.astro` has inputs and a `type="button"` with no `<form>` or handler. Wire it up (Netlify Forms, Formspree or Resend, with server-side validation and rate limiting) or replace it with a `mailto:` link.
- [ ] **Template blog posts are live.** `markdown-style-guide`, `using-mdx` and `how-i-found-time` are Astro boilerplate with `hidden: false`, and appear on the site, RSS and sitemap. Write real posts, hide them, or set `BLOG_ENABLED=false`.
- [ ] **Placeholder project links.** `src/lib/projects.ts` has 11 `TODO` links to `https://example.com/...` (Download, Visit, Visit landing). Replace or remove them.
- [ ] **Placeholder contact copy.** `contact.astro` description and `ContactHeroSection.astro` intro still say "Placeholder" or have `TODO` comments.
- [ ] **Verify work history.** `src/lib/experience.ts` has copy-pasted descriptions (Softec, Diatomea, FUNIBER) and unverified metrics ("50k+ users", "42% bundle reduction"). Confirm or remove each claim.

## Security

- [ ] **Add a Content-Security-Policy** to `netlify.toml` (the site uses inline scripts in `BaseHead`, `DotsBackground` and `GridBackground`; move them to modules or hash them).
- [ ] **Remaining audit finding:** one low-severity `esbuild` advisory via Astro. Recheck with `pnpm audit` after each Astro update.
- [ ] Decide whether to keep `Strict-Transport-Security ... preload` in `netlify.toml` (hard to undo).
- [ ] Set up Dependabot or Renovate for dependency updates.
- [ ] Confirm you are comfortable publishing your current employer (Sngular) and work history.

## Performance

- [ ] **Compress `public/3d-models/v60-dryer-3d.glb`** (16 MB). Use `gltf-transform` with Draco or meshopt and resized textures; target under 2 MB. Add a poster and lazy load it.
- [ ] **Investigate why `dist/_astro` ships original PNGs** next to the WebP versions (about 30 MB `dist`). Something references the raw files instead of `<Image>`.
- [x] **Delete unused assets** (about 10 MB): `src/assets/img/devices/*-mock.png`, `f1lmlog-2.png`, `mock-2.png`, `blog-placeholder-2/3.jpg`, 27 `sticker-test-*.svg` files, duplicate `project-*.png` copies, `.DS_Store` files, unused `public/fonts/atkinson-*.woff`.
- [ ] Subset fonts to latin only (`@fontsource/*/latin.css`), consider dropping Pangolin, and preload the main body font.
- [ ] Run Lighthouse on home, projects and a project page; targets: LCP under 2.5 s, CLS under 0.1, INP under 200 ms, scores of 95 or more.
- [ ] Check the `three` peer warning from `@google/model-viewer` 4.4.0 (wants 0.183, gets 0.182) and confirm the V60 model still renders.

## SEO

- [x] Add a real **404 page** (`src/pages/404.astro`).
- [x] `/about` is `noindex` but listed in the sitemap, and `/all` duplicates the homepage. Remove or `noindex` and filter them from the sitemap.
- [ ] Add a real Open Graph image (every page falls back to `blog-placeholder-1.jpg`), plus per-page descriptions.
- [ ] Add structured data beyond `WebSite` (`Person`, `Article` for posts).

## Code quality

- [x] Remove unused imports flagged by `astro check` (`ProjectsFailsSection`, `Text`, `Icon`, `Section`, `slug`, unused `Props`).
- [ ] `src/pages/blog/index.astro` uses a top-level `Astro.redirect` when the blog is disabled; for a static site skip building that page instead.
- [ ] Add ESLint and a CI workflow (GitHub Actions or Netlify build check) running `pnpm check` and `pnpm build`.
- [ ] Extend the pre-commit hook beyond images (typecheck, `pnpm audit`).
- [x] README: remove the GSAP mention (not a dependency) and mention `fnm`, `.node-version` and Netlify.
- [x] Rename `package.json` `name` (`fervqz-web-v2`) to match the repo, and remove the empty `docs/` folder.
- [ ] Replace the deprecated `exiftool.write` signature in `scripts/strip-image-metadata.mjs`.

## Tooling and housekeeping

- [ ] Click through `pnpm dev` after the Astro 7, Tailwind 4.3 and TypeScript 6 upgrades: stickers, theme toggle, dots background, 3D viewer, both themes, mobile widths.
- [ ] Reconsider TypeScript 7 once `astro check` supports it (or move to `@astrojs/ts-content-mapper`).
- [ ] Connect the project to Netlify and confirm the `netlify.toml` headers and cache rules apply (including `/3d-models`).
- [ ] Set `BLOG_ENABLED` in Netlify environment variables if the blog should stay off.
