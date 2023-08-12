import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // checker({
    //   // E.g. use TypeScript check
    //   typescript: true,
    //   eslint: {
    //     // For example, lint .ts and .tsx
    //     lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}"',
    //   },
    //   overlay: true,
    // }),
  ],
});
