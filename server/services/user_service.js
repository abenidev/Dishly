import Constants from "../constants/constants.js";
import { UserModel } from "../models/sequelize/user_model.js";
import bcrypt from 'bcrypt';

class UserService {
    constructor(sequelize) {
        UserModel(sequelize);
        this.client = sequelize;
        this.userModel = sequelize.models.User;
    }

    async createUser({ firstName, lastName, email, password }) {
        try {
            //hash password before storing it in the database
            const hashedPassword = await bcrypt.hash(password, Constants.saltRounds);
            password = hashedPassword;
            const user = await this.userModel.create({ firstName, lastName, email, password });
            return user;
        } catch (error) {
            return error;
        }
    }

    async updateUser(id, updatedUserData) {
        try {
            await this.userModel.update(updatedUserData, { where: { id } });
            const user = await this.getUserById(id);
            return user;
        } catch (error) {
            return error;
        }
    }

    async deleteUser(id) {
        try {
            const toBeDeletedUser = await this.getUserById(id);
            if (!toBeDeletedUser) return null;
            await this.userModel.destroy({ where: { id } });
            return toBeDeletedUser;
        } catch (error) {
            return error;
        }
    }

    async getAllUsers() {
        try {
            const users = await this.userModel.findAll({
                //* - The { raw: true } option is used to get the results in a plain object format, 
                //* - rather than as instances of the User model.
                raw: true,
                //* - The { attributes: ['id', 'firstName', 'lastName', 'email'] } option is used to specify 
                //* - the columns to be returned in the result.
                // attributes: ['id', 'firstName', 'lastName', 'email'],
                //* - returns all the attributes except for the password
                attributes: { exclude: ['password'] }
            });
            return users;
        } catch (error) {
            return error;
        }
    }

    async getUserById(id) {
        try {
            const user = await this.userModel.findOne({ where: { id } });
            return user;
        } catch (error) {
            return error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.userModel.findOne({ where: { email } });
            return user;
        } catch (error) {
            return error;
        }
    }
}

export default UserService;