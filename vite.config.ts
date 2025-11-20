import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente baseadas no modo (development/production)
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Isso permite que o código use 'process.env.API_KEY' no frontend
      // sem precisar alterar todo o código para 'import.meta.env'
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  };
});