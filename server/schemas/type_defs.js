export const typeDefs = `#graphql
    type User {
        id: String!,
        firstName: String!,
        lastName: String!,
        email: String!,
        token: String,
        photoUrl: String!,
        userTypes: [UserType]!,
    }

    type UserType{
        id: String!,
        type: String!,
        UserId: String!,
    }

    type Restaurant{
        id: String!,
        name: String!,
        address: String!,
        phoneNumber: String!,
        description: String,
        lat: String!,
        long: String!,
        menuItems: [MenuItem]!,
        UserId: String!,
    }

    type MenuItem{
        id: String!,
        name: String!,
        description: String!,
        price: Float!,
        RestaurantId: String!,
    }

    type Query {
        users: [User],
        userById(id: String!): User,
        userByEmail(email: String!): User
        restaurants: [Restaurant],
        menuItems: [MenuItem],
    }

    type Mutation{
        # addUser(input: AddUserInput!): User
        # authenticate(email: String!, password: String!): User
        updateUser(input: UpdateUserInput!): User
        # deleteUser(id: String!): User
        authenticateWithGoogleAcc(input: AuthenticateWithGoogleAccInput!): User
        addRestaurant(input: AddRestaurantInput!): Restaurant
        addMenuItem(input: AddMenuItemInput!): MenuItem
        addUserTypeToUser(input: AddUserTypeToUserInput!): User
    }

    input AddUserTypeToUserInput{
        userType: String!
    }

    input AddMenuItemInput{
        name: String!,
        description: String!,
        price: Float!,
        RestaurantId: String!,
    }

    input AddRestaurantInput{
        name: String!,
        address: String!,
        phoneNumber: String!,
        description: String,
        lat: String!,
        long: String!,
    }

    input AuthenticateWithGoogleAccInput{
        email: String!,
        firstName: String!,
        lastName: String!,
        photoUrl: String!,
        # userType: String!,
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

