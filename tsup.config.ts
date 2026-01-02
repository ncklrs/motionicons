import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    compilerOptions: {
      incremental: false
    }
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'motion'],
  treeshake: true,
  minify: false,
  banner: {
    js: '"use client";'
  }
})
