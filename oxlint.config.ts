import { defineOxlintConfig } from '@jiakun-zhao/config'

export default defineOxlintConfig({
  ignorePatterns: ['extensions/**/raycast-env.d.ts'],
  rules: {
    'new-cap': 'off',
    'no-process-env': 'off',
  },
})
