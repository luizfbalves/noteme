
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3333/graphql",
  documents: "./src/features/apollo/*.tsx",
  generates: {
    "src/features/gql/": {
      preset: "client",
      plugins: ['typescript'],
    }
  }
};

export default config;
