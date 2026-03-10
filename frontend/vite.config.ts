import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      port: Number(env.VITE_PORT),
      proxy: {
        '/api': env.VITE_BACKEND_URL,
      },
    },
    plugins: [react(), tailwindcss()],
  };
});
