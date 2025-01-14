import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from "@apollo/server/standalone";
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";


//
import { connectDB } from './db/db.js';
import { typeDefs } from './schemas/type_defs.js';
import { resolvers } from './schemas/resolvers.js';
import UserService from './services/user_service.js';
import config from './db/config.js';


const app = express();
const httpServer = http.createServer(app);
connectDB();

//services
const userService = new UserService(config.development.postgres.client);

//server
const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers(userService),
    plugins: [
        //* disables the GraphiQL interface
        // ApolloServerPluginLandingPageDisabled(),
        ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
app.use(
    '/graphql',
    cors(),
    express.urlencoded({ extended: true }),
    express.json(),
    expressMiddleware(server),
);
