import react from '@vitejs/plugin-react';
import { searchForWorkspaceRoot } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: 'dist/spa',
  },
  test: {
    coverage: {
      provider: 'v8',
      include: ['client/lib/**/*.ts'],
      reporter: ['text', 'json-summary'],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
  server: {
    host: '::',
    port: 8080,
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()), './client', './shared'],
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**'],
    },
  },
});
