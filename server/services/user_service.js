import Constants from "../constants/constants.js";
import jwt from 'jsonwebtoken';
import Models from "../models/sequelize/index.js";

class UserService {
    constructor(sequelize) {
        Models(sequelize);
        this.client = sequelize;
        this.models = sequelize.models;
        this.userTypeModel = sequelize.models.UserType;
        this.userModel = sequelize.models.User;
    }

    signJwt(userId) {
        return jwt.sign({ data: userId }, Constants.jwtSecret, { expiresIn: Constants.jwtExpiresIn });
    }

    async authenticateWithGoogleAcc({ email, firstName, lastName, photoUrl }) {
        try {
            const user = await this.userModel.findOne({ where: { email }, attributes: { exclude: ['password'] } });
            //* check if user exists
            if (!user) {
                const user = await this.userModel.create({ firstName, lastName, email, photoUrl });
                // const newUserType = await this.userTypeModel.create({ type: userType, UserId: user.id });
                user.token = this.signJwt(user.id);
                return user;
            };

            user.token = this.signJwt(user.id);
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async addUserTypeToUser(userId, input) {
        try {
            const { userType } = input;
            const newUserType = await this.userTypeModel.create({ type: userType, UserId: userId });
            const user = await this.getUserById(userId);
            return user;
        } catch (error) {
            return error;
        }
    }

    async getUserTypesByUserId(userId) {
        try {
            const userTypes = await this.userTypeModel.findAll({ where: { UserId: userId } });
            return userTypes;
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


    //
    //
    //
    //

    // async authenticateUser({ email, password }) {
    //     try {
    //         const user = await this.userModel.findOne({ where: { email } });
    //         //TODO: check if user exists
    //         if (!user) throw new GraphQLError('User not found', {
    //             extensions: {
    //                 code: 'USERNOTFOUND',
    //             },
    //         });
    //         const isPasswordValid = await bcrypt.compare(password, user.password);
    //         //TODO: check if password is valid
    //         if (!isPasswordValid) return 'Invalid password';
    //         user.token = jwt.sign({ data: user.id }, Constants.jwtSecret, { expiresIn: '1h' });
    //         return user;
    //     } catch (error) {
    //         return error;
    //     }
    // }

    // async createUser({ firstName, lastName, email, password }) {
    //     try {
    //         //hash password before storing it in the database
    //         const hashedPassword = await bcrypt.hash(password, Constants.saltRounds);
    //         password = hashedPassword;
    //         const user = await this.userModel.create({ firstName, lastName, email, password });
    //         return user;
    //     } catch (error) {
    //         return error;
    //     }
    // }
}

export default UserService;