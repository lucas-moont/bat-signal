import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // The renderer's import paths, as electron.vite.config.ts sets them, for the tests that render it.
  resolve: {
    alias: {
      '@renderer': resolve('src/renderer/src'),
      '@shared': resolve('src/shared'),
    },
  },
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'node',
    passWithNoTests: true,
  },
})
