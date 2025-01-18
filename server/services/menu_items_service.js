import { raw } from 'express';
import Models from '../models/sequelize/index.js';

class MenuItemService {
    constructor(sequelize) {
        Models(sequelize);
        this.client = sequelize;
        this.models = sequelize.models;
        this.menuItemModel = sequelize.models.MenuItem;
    }

    async getAllMenuItems() {
        try {
            const menuItems = await this.menuItemModel.findAll({
                raw: true,
            });
            return menuItems;
        } catch (error) {
            return error;
        }
    }

    async createMenuItem(menuItemData) {
        try {
            const newMenuItem = await this.menuItemModel.create(menuItemData);
            return newMenuItem;
        } catch (error) {
            return error;
        }
    }

    async getMenuItemsByRestaurantId(restaurantId) {
        try {
            const menuItems = await this.menuItemModel.findAll({ where: { RestaurantId: restaurantId } });
            return menuItems;
        } catch (error) {
            return error;
        }
    }
}

export default MenuItemService;