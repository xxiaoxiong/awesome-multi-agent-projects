import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  site: "https://awesome-multi-agent-projects-site.vercel.app",
  output: "static",
  integrations: [sitemap({ i18n: { defaultLocale: "en", locales: { en: "en-US", zh: "zh-CN" } } })],
  vite: { plugins: [tailwindcss() as any] }
});
