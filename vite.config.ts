import react from '@vitejs/plugin-react';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

export default defineConfig(() => ({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: 'dist/spa',
  },
  server: {
    host: '::',
    port: 8080,
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()), './client', './shared'],
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**'],
    },
  },
}));
