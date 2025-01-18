class Constants {
    static port = process.env.PORT || 4000;
    static saltRounds = process.env.SALT_ROUNDS || 10;
    static jwtSecret = process.env.JWT_SECRET || 'secret';
    static adminEmail = 'abenidev@gmail.com';
    static jwtExpiresIn = '365d';
    static corsOptions = {
        credentials: true,
        allowedHeaders: ['Authorization'],
        exposedHeaders: ['Authorization'],
    };
    static restaurantOwnerType = "RestaurantOwner";
    static customerType = "Customer";
    static deliveryPersonType = "DeliveryPerson";
}

export default Constants;