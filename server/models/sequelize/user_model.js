import { DataTypes } from "sequelize";

export const UserModel = (sequelize) => {
    const user = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            // set a custom getter
            get() {
                const firstName = this.getDataValue('firstName');
                return firstName ? firstName.toUpperCase() : null;
            }
            //* sets a default value
            // defaultValue: 'John',
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensures the email column is unique
            validate: {
                isEmail: true, // Optional: Validates email format
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            //* set a custom setter
            // set(value) {}
        }
    }, {
        //makes the table name the same as the defined model name above without pluralization
        // freezeTableName: true,
        //sets the table name to a custom name defined below
        tableName: 'users',
        //*removes/adds the createdAt and updatedAt columns
        // timestamps: true,
        //*removes/adds the createdAt and updatedAt columns
        // createdAt: false,
        // updatedAt: false,
        //*sets custom names for createdAt and updatedAt columns
        // createdAt: 'createTimeStamp',
        // updatedAt: 'updateTimeStamp',
    });

    // force: true will drop the table if it already exists
    // alter: true will alter the table if it already exists
    sequelize.sync({ alter: true }).then(() => console.log('User table created'));
    return user;
}