export const resolvers = (userService) => {
    return {
        Query: {
            users: async () => {
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
        },
        Mutation: {
            addUser: async (parent, args, context) => {
                const user = await userService.createUser(args.input);
                return user;
            },
            updateUser: async (parent, args, context) => {
                const user = await userService.updateUser(args.id, args.input);
                return user;
            },
            deleteUser: async (parent, args, context) => {
                const user = await userService.deleteUser(args.id);
                return user;
            },
        }
    };
}
