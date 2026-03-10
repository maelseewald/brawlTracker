import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Lädt .env-Variablen ohne VITE_-Prefix auch für die Konfiguration selbst
  const env = loadEnv(mode, process.cwd(), '');
  const backendUrl = env.DEV_BACKEND_URL || 'http://localhost:29678';

  return {
    server: {
      port: 8905,
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
        },
      },
    },
    plugins: [react(), tailwindcss()],
  };
});
