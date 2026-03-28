import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {

  return {
    envDir: '../',
    server: {
      port: Number(8905),
      proxy: {
        '/api': {
          target: 'http://129.212.194.222:29678/',
          changeOrigin: true,
        },
      },
    },
    plugins: [react(), tailwindcss()],
  };
});
