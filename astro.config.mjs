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
      config: {
        debug: true, // Enable debug mode to see more information
        forward: [
          "dataLayer.push",
          "gtag",
          "ga",
          "google_tag_manager",
          "googletag",
        ],
        resolveUrl: (url, location, type) => {
          // Handle Google-specific domains
          const googleUrls = [
            "googleads.g.doubleclick.net",
            "www.googletagmanager.com",
            "www.googleadservices.com",
            "googletagservices.com",
            "www.google-analytics.com",
            "stats.g.doubleclick.net",
          ];

          // Check if the URL is from a Google domain
          if (googleUrls.some((domain) => url.hostname.includes(domain))) {
            // Special handling for service_worker URLs
            if (
              url.href.includes("service_worker") ||
              url.href.includes("sw_iframe")
            ) {
              // Create a new URL object with specific attributes for service workers
              const newUrl = new URL(url.href);

              // Set multiple properties for handling service workers
              Object.defineProperties(newUrl, {
                proxy: {
                  value: true,
                  writable: true,
                  configurable: true,
                },
                noCors: {
                  value: true,
                  writable: true,
                  configurable: true,
                },
              });

              return newUrl;
            }

            // Standard handling for other Google URLs
            const newUrl = new URL(url.href);
            Object.defineProperty(newUrl, "proxy", {
              value: true,
              writable: true,
              configurable: true,
            });
            return newUrl;
          }

          // Default handling for other URLs
          return undefined; // Let Partytown handle it normally
        },
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
