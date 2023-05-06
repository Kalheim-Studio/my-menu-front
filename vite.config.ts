import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0",
        hmr: {
            clientPort: 9999,
        },
        port: 9999,
        watch: {
            usePolling: true,
        },
    },
});
