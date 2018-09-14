import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';

import schema from './schema';

const app = express();

const server = new ApolloServer({
  schema,
});

server.applyMiddleware({ app });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
app.listen({ port: 4000 }), () =>
console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
