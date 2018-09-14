import { gql, makeExecutableSchema } from 'apollo-server-express';

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
