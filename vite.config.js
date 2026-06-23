import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Yeh line strict checking ko warning me badal degi, jisse build fail nahi hogi
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      input: {
        main: "./index.html",
      },
      // Yeh sabse zaroori line hai: agar koi cycle dikhegi toh build nahi rukegi
      onwarn(warning, warn) {
        if (warning.code === 'CYCLIC_CROSS_CHUNK_REPROJECTION' || warning.code === 'CIRCULAR_DEPENDENCY') return;
        warn(warning);
      }
    },
  },
});