export const typeDefs = `#graphql
    type User {
        id: String!,
        firstName: String!,
        lastName: String!,
        email: String!,
    }

    type Query {
        users: [User],
        userById(id: String!): User,
        userByEmail(email: String!): User
    }

    type Mutation{
        addUser(input: AddUserInput!): User
        updateUser(id: String!, input: UpdateUserInput!): User
        deleteUser(id: String!): User
    }

    input AddUserInput {
        firstName: String!,
        lastName: String!,
        email: String!,
        password: String!,
    }

    input UpdateUserInput {
        firstName: String,
        lastName: String,
    }
`;

// int, float, string, boolean, ID

