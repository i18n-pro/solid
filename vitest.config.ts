import { defineConfig } from 'vitest/config'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['json', 'html', 'text-summary', 'text'],
    },
    environment: 'jsdom',
  },
})
