import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
      cors: true,
    },
    plugins: [
       basicSsl({
       name: 'test',
       domains: ['*.custom.com'],
       certDir: '/Users/.../.devServer/cert',
     }),
      react({
        babel: {
          plugins: ['babel-plugin-react-compiler'],
        }
      }),
      tailwindcss()
    ],
})
