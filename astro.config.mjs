// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";


// https://astro.build/config
export default defineConfig({
	site: 'https://fervqz.com',
	prefetch: true,
	devToolbar: {
		enabled: false,
	},
	integrations: [mdx(), sitemap({
			filter: (page) =>
				!page.endsWith('/about/') && !page.endsWith('/all/'),
		}), icon()],
	vite: {
		plugins: [tailwindcss()],
	},
});
