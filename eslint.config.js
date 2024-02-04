import antfu from '@antfu/eslint-config'

export default antfu(
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-console': 'off',
    },
  },
)
