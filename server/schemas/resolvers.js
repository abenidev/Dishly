import Constants from "../constants/constants.js";
import { GraphQLError } from 'graphql';

async function handleAdminAuthentication(userService, id) {
    if (!id) throw new GraphQLError('Not authenticated', { extensions: { code: 'NOTAUTHENTICATED' } });
    const user = await userService.getUserById(id);
    if (!user) throw new GraphQLError('Not authorized', { extensions: { code: 'NOTAUTHORIZED' } });
    return user;
    // if (user.email !== Constants.adminEmail) throw new GraphQLError('Not authorized', { extensions: { code: 'NOTAUTHORIZED' } });
}

export const resolvers = (userService, restaurantService, menuItemService) => {
    return {
        Query: {
            users: async (parent, args, context) => {
                // const id = context.id;
                // await handleAdminAuthentication(userService, id);
                const users = await userService.getAllUsers();
                return users;
            },
            userById: async (parent, args, context) => {
                const user = await userService.getUserById(args.id);
                return user;
            },
            userByEmail: async (parent, args, context) => {
                const user = await userService.getUserByEmail(args.email);
                return user;
            },
            restaurants: async (parent, args, context) => {
                const id = context.id;
                await handleAdminAuthentication(userService, id);
                const restaurants = await restaurantService.getAllRestaurants();
                return restaurants;
            },
            menuItems: async (parent, args, context) => {
                const id = context.id;
                await handleAdminAuthentication(userService, id);
                const menuItems = await menuItemService.getAllMenuItems();
                return menuItems;
            },

            //


        },
        User: {
            userTypes: async (parent, args, context) => {
                const userTypes = await userService.getUserTypesByUserId(parent.id);
                return userTypes;
            }
        },
        Restaurant: {
            menuItems: async (parent, args, context) => {
                const menuItems = await menuItemService.getMenuItemsByRestaurantId(parent.id);
                return menuItems;
            }
        },
        Mutation: {
            authenticateWithGoogleAcc: async (parent, args, context) => {
                const user = await userService.authenticateWithGoogleAcc(args.input);
                if (!user) {
                    throw new GraphQLError('User not found', {
                        extensions: { code: 'USERNOTFOUND' },
                    });
                }
                return user;
            },
            addUserTypeToUser: async (parent, args, context) => {
                const id = context.id;
                await handleAdminAuthentication(userService, id);
                const user = await userService.addUserTypeToUser(id, args.input);
                return user;
            },
            updateUser: async (parent, args, context) => {
                const id = context.id;
                await handleAdminAuthentication(userService, id);
                const user = await userService.updateUser(id, args.input);
                return user;
            },
            addRestaurant: async (parent, args, context) => {
                const id = context.id;
                const user = await handleAdminAuthentication(userService, id);
                const userTypes = await userService.getUserTypesByUserId(user.id);
                if (!userTypes.find(userType => userType.type === Constants.restaurantOwnerType)) {
                    throw new GraphQLError('Restaurant can only be created by a restaurant owner.', { extensions: { code: 'CANNOTCREATERESTAURANT' } });
                }
                const restaurant = await restaurantService.createRestaurant(user.id, args.input);
                return restaurant;
            },
            addMenuItem: async (parent, args, context) => {
                const id = context.id;
                const { RestaurantId } = args.input;
                const user = await handleAdminAuthentication(userService, id);
                const restaurant = await restaurantService.getRestaurantByRestaurantId(RestaurantId);
                if (!restaurant) {
                    throw new GraphQLError('Restaurant not found', { extensions: { code: 'RESTAURANTNOTFOUND' } });
                }
                if (restaurant.UserId !== user.id) {
                    throw new GraphQLError('MenuItem can only be created by the restaurant owner.', { extensions: { code: 'CANNOTCREATEMENUITEM' } });
                }
                const menuItem = await menuItemService.createMenuItem(args.input);
                return menuItem;
            },




            //*
            // deleteUser: async (parent, args, context) => {
            //     const id = context.id;
            //     await handleAdminAuthentication(userService, id);
            //     const toBeDeletedUser = await userService.getUserById(args.id);
            //     if (toBeDeletedUser.email === Constants.adminEmail) throw new GraphQLError('Cannot delete admin', { extensions: { code: 'CANNOTDELETEADMIN' } });
            //     const user = await userService.deleteUser(args.id);
            //     return user;
            // },
            //
            //*
            // authenticate: async (parent, args, context) => {
            //     const user = await userService.authenticateUser(args);
            //     return user;
            // },
            // addUser: async (parent, args, context) => {
            //     const user = await userService.createUser(args.input);
            //     return user;
            // },
        }
    };
}
