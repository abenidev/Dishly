import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";

//
import { connectDB } from './db/db.js';
import { typeDefs } from './schemas/type_defs.js';
import { resolvers } from './schemas/resolvers.js';
import UserService from './services/user_service.js';
import config from './db/config.js';
import Constants from './constants/constants.js';
import RestaurantService from './services/restaurant_service.js';
import MenuItemService from './services/menu_items_service.js';


const app = express();
connectDB();

const context = ({ req }) => {
    const ctx = {
        id: null,
    };
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization;
            const verifiedToken = jwt.verify(token, Constants.jwtSecret);
            ctx.id = verifiedToken.data;
        }
    } catch (error) {
        console.error(error);
    }
    return ctx;
};

//services
const userService = new UserService(config.development.mariadb.client);
const restaurantService = new RestaurantService(config.development.mariadb.client);
const menuItemService = new MenuItemService(config.development.mariadb.client);

//server
const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers(userService, restaurantService, menuItemService),
    // plugins: [
    //* disables the GraphiQL interface
    // ApolloServerPluginLandingPageDisabled(),
    // ApolloServerPluginDrainHttpServer({ httpServer }),
    // ],
});

await server.start();

app.use(
    '/graphql',
    cors(Constants.corsOptions),
    express.json(),
    expressMiddleware(server, { context }),
);

app.listen({ port: Constants.port }, () => {
    console.log(`🚀  Server ready at http://localhost:4000/graphql`);
});



