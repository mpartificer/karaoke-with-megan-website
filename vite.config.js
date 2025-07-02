import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // This ensures relative paths for assets
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
