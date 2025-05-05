import { defineConfig } from 'vitest/config'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  test: {
    globals: true,
    coverage: {
      ignoreEmptyLines: true,
      thresholds: {
        branches: 10,
        functions: 10,
        lines: 10,
        statements: 10,
      },
      reporter: ['text', 'html', 'json', 'json-summary'],
      // Coverage reports even if tests are failing
      reportOnFailure: true,
      include: ['src/context.tsx', 'src/Provider.tsx'],
    },
    environment: 'jsdom',
  },
})
