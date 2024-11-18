import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const rootDir = path.resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ tsDecorators: true })],
  resolve: {
    alias: {
      '@config': path.resolve(rootDir, 'src/config'),
      '@app': path.resolve(rootDir, 'src/app'),
      '@pages': path.resolve(rootDir, 'src/pages'),
      '@widgets': path.resolve(rootDir, 'src/widgets'),
      '@features': path.resolve(rootDir, 'src/features'),
      '@entities': path.resolve(rootDir, 'src/entities'),
      '@shared': path.resolve(rootDir, 'src/shared'),
      '@ui': path.resolve(rootDir, 'src/ui'),
    },
  },
});
