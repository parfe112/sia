// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",

  experimental: {
    responsiveImages: true,
  },
  // Configure image optimization
  image: {
    domains: [],
    remotePatterns: [{ protocol: "https" }],
  },
  vite: {
    plugins: [tailwindcss()],
    css: {
      devSourcemap: true,
    },
  },

  adapter: node({
    mode: "standalone",
  }),
});
