import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access from the host machine
    port: 3000,
    watch: {
      usePolling: true, // Necessary for hot reload in Docker
    },
  },
});
