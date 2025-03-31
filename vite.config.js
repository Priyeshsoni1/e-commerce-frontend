import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(import.meta.env.VITE_PORT) || 3000, // Use Render's PORT env variable or fallback to 3000
    host: "0.0.0.0", // Bind to all network interfaces for external access
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
