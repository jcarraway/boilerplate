import { buildSchema } from 'type-graphql';

export const buildTypeGraphQLSchema = async () => {
  const schema = await buildSchema({
    resolvers: [__dirname + '/modules/**/*.resolver.ts'],
    emitSchemaFile: true,
  });
  console.log(schema);
  return schema;
};
