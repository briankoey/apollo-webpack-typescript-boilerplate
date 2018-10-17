import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import { mergeSchemas } from 'graphql-tools';
import dotenv from 'dotenv';
import compression from 'compression';
import bodyParser from 'body-parser';

import schemas from './schemas';
import resolvers from './resolvers';

/**
 * Entry point of the application
 */
class App {
  private _app: express.Application;
  private _server: ApolloServer;

  /**
   * Initialise express app, apollo server with graphql schemas and resolvers defined
   * Context for apollo server required special object properties, resolverType for resolver resolution purpose
   */
  constructor() {
    // initialise api
    this._app = express();
    // initialise apollo server and return custom context
    this._server = new ApolloServer(
      {
        schema: mergeSchemas({ schemas, resolvers }),
        // mocks: true
      });
    // Initialise middleware
    this.setupMiddleware();
  }

  /**
   * Read your .env file, parse the contents, assign it to process.env
   */
  initaliseProcessEnv(): void {
    dotenv.config();
  }

  /**
   * Middleware:
   * cors - Enable restricted resources on a web page to be requested from another domain
   * compression - Compress response bodies for all request that traverse this middleware
   * bodyParser - Parses json and only looks at requests where the Content-Type header matches the type option.
   *            - https://www.quora.com/What-exactly-does-body-parser-do-with-express-js-and-why-do-I-need-it
   */
  private setupMiddleware(): void {
    this._app.use(cors());
    this._app.use(compression());
    this._app.use(bodyParser.urlencoded({ extended: false }));
    this._app.use(bodyParser.json());
  }

  /**
   * Registration of middleware for apollo server
   */
  setupServer(): void {
    this._server.applyMiddleware({ app: this._app });
  }

  /**
   * Binds and listens for connections on the specified host and port.
   */
  startServer(): void {
    this._app.listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready at http://localhost:4000${this._server.graphqlPath}`);
    });
  }
}

const app = new App();
app.initaliseProcessEnv();
app.setupServer();
app.startServer();
