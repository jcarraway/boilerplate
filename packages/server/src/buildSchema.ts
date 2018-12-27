import { buildSchema } from 'type-graphql';

export const buildTypeGraphQLSchema = async () => {
  const schema = await buildSchema({
    resolvers: [__dirname + '/modules/**/*.resolver.ts'],
    emitSchemaFile: true,
    // suppresses errors triggered when performing custom validation
    // see: https://github.com/19majkel94/type-graphql/issues/150
    validate: false,
    authChecker: ({ context }) => {
      return context.req.session && context.req.session.userId; // false if access denied
    },
  });
  console.log(schema);
  return schema;
};
