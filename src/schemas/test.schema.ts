import {
    gql,
    makeExecutableSchema,
} from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';

const testSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: gql`
    type Query {
       hello: String
    }
  `,
});

export default testSchema;
