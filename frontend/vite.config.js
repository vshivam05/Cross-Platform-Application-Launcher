import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Make the server accessible from other devices on the network
    port: 5173, // Ensure this matches the port you're using
    proxy: {
      "/api": {
        target: "http://172.20.107.216:2354",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
