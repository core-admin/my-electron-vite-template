import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['electron-builder.ts'],
  outDir: './dist-tsup',
  format: ['cjs'],
  target: 'esnext',
  dts: false,
  splitting: false,
  clean: true,
  shims: false,
  minify: true,
});
