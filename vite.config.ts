import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    createHtmlPlugin({
      inject: {
        data: {
          VITE_SYSTEM_FONTS: process.env.VITE_SYSTEM_FONTS,
          VITE_HANDWRITING_FONTS: process.env.VITE_HANDWRITING_FONTS,
        },
      },
    }),
  ],
});
