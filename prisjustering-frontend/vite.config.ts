//vite.config.ts

import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Alle kall som starter med /api sendes til backend på port 5000
      // Endre target til din faktiske backend‐URL
      "/api": {
        target: "https://localhost:7142",
        changeOrigin: true,
        secure: false,
        // rewrite lar deg trimme bort /api-prefix hvis backend ikke bruker det
        // rewrite: (path) => path.replace(/^\/api/, "")
      },
    },
  },
});