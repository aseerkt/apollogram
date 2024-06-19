import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:5000/graphql',
  documents: 'src/graphql/**/*.{ts,tsx}',
  generates: {
    'src/gql/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      plugins: [],
    },
  },
}

export default config
