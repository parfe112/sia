// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    partytown({
      // Example: Add dataLayer.push as a forwarding-event.
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  output: "server",

  experimental: {
    responsiveImages: true,
  },
  // Configure image optimization
  image: {
    experimentalLayout: "responsive",
    experimentalObjectFit: "cover",
    experimentalObjectPosition: "center",
    domains: [],
    remotePatterns: [{ protocol: "https" }],
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        jpeg: {
          quality: 80,
          progressive: true,
        },
        jpg: {
          quality: 80,
          progressive: true,
        },
        png: {
          quality: 80,
          progressive: true,
        },
        webp: {
          quality: 80,
        },
        avif: {
          quality: 75,
        },
      },
    },
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
