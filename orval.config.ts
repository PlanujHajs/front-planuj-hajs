export default {
  api: {
    input: './openapi.json',
    output: {
      target: 'src/api',
      client: 'react-query',
      mode: 'tags-split',
      schemas: 'src/api/types',
      override: {
        mutator: {
          path: './src/api/mutator/axiosCustom.ts',
          name: 'axiosCustom',
        },
      },
    },
  },
} as const;