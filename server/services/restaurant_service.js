import Models from '../models/sequelize/index.js';


class RestaurantService {
    constructor(sequelize) {
        Models(sequelize);
        this.client = sequelize;
        this.models = sequelize.models;
        this.restaurantModel = sequelize.models.Restaurant;
    }

    async getAllRestaurants() {
        try {
            const restaurants = await this.restaurantModel.findAll({
                raw: true,
            });
            return restaurants;
        } catch (error) {
            return error;
        }
    }

    async getRestaurantByRestaurantId(restaurantId) {
        try {
            const restaurant = await this.restaurantModel.findOne({ where: { id: restaurantId } });
            return restaurant;
        } catch (error) {
            return error;
        }
    }

    async createRestaurant(userId, restaurantData) {
        try {
            const newRestaurant = await this.restaurantModel.create({ ...restaurantData, UserId: userId });
            return newRestaurant;
        } catch (error) {
            return error;
        }
    }
}

export default RestaurantService;