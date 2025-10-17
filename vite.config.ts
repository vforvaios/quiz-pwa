import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    host: true,
  },
  plugins: [
    react(),
    VitePWA({
      srcDir: "src",
      filename: "my-worker.ts",
      strategies: "injectManifest",
      registerType: "autoUpdate",
      injectManifest: {
        minify: false,
        enableWorkboxModulesLogs: true,
      },
      injectRegister: "auto",
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
      },
      manifest: {
        name: "Kipourgies",
        short_name: "Kipourgies",
        screenshots: [
          {
            src: "/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            form_factor: "wide",
            label: "Application",
          },
          {
            src: "/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile application",
          },
        ],
        icons: [
          {
            src: "/favicon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#171717",
        background_color: "#f0e7db",
        display: "standalone",
        description: "Thodoris Pasxalidis Company",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [],
        globPatterns: [],
      },
    }),
  ],
  define: {
    "import.meta.env": {}, // Prevents ESLint issues
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"), // ✅ works locally & on Vercel
    },
  },
});
