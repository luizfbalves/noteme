import { CodegenConfig } from '@graphql-codegen/cli';
import { env } from 'node:process';

const config: CodegenConfig = {
  schema: './',
  documents: ['src/**/*.tsx'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;