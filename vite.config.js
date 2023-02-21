import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ["assets/favicon.ico"],
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "My Music App",
        description:
          "This application is design with figma and build with Vuejs,\r\n Pinia, Vee-validate, Vue-router and other\r\n    librairies. Fews recommendations to visit the app. i implented\r\n    infinite scroll and the music request the database when scroll\r\n    down, you can upload the music\r\n if you are authenticated first and selected music.",
        background_color: "#ff5e3a",
        icons: [
          {
            src: "assets/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "assets/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpeg,jpg}"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
