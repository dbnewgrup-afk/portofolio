// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // izinkan semua subdomain ngrok
    allowedHosts: [".ngrok-free.app"],

    // biar HMR aman lewat https tunnel
    hmr: {
      protocol: "wss",
      clientPort: 443,
    },
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
    allowedHosts: [".ngrok-free.app", "https://00edf3a5f622.ngrok-free.app/"],
  },
});
