import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Use relative base so build can be served from any path like GitHub Pages
  base: './',
  // Dev server proxy to forward PHP form submissions to a local PHP server
  server: {
    proxy: {
      // When the browser requests /send_email.php during `npm run dev`,
      // forward the request to the PHP built-in server (running on :8000)
      '/send_email.php': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // keep the same path
      },
    },
  },
});
