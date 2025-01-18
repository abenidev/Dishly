import { DataTypes } from "sequelize";

const Models = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            //* - set a custom getter
            // get() {
            //     const firstName = this.getDataValue('firstName');
            //     return firstName ? firstName.toUpperCase() : null;
            // }
            //* - sets a default value
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
        photoUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // password: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        //     //* set a custom setter
        //     // set(value) {}
        // },
        // token: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // }
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
        // *if true it will not delete the record, but instead set the deletedAt timestamp
        // paranoid: true,
    });

    const UserType = sequelize.define('UserType', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'userTypes'
    });

    //
    const Restaurant = sequelize.define('Restaurant', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        long: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'restaurants'
    });

    const MenuItem = sequelize.define('MenuItem', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        }
    }, {
        tableName: 'menuItems'
    });

    //* associations
    //------------------- One-to-One Association
    // User.hasOne(Profile);
    // Profile.belongsTo(User);

    //-------------------- One-to-Many Association
    // User.hasMany(Post);
    // Post.belongsTo(User);

    //-------------------- Many-to-Many Association
    // User.belongsToMany(Role, { through: 'UserRole' });
    // Role.belongsToMany(User, { through: 'UserRole' });
    //*-----------------------------------------------------------------------

    // user -> userTypes
    User.hasMany(UserType, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });
    UserType.belongsTo(User, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });

    // restaurant -> menuItems
    // associate the restaurantId with the id in the restaurant model with one to many format according to: restaurant -> menuItems
    Restaurant.hasMany(MenuItem, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false,
            // name: 'restaurantId',
        },
    });
    MenuItem.belongsTo(Restaurant, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false,
            // name: 'restaurantId',
        },
    });

    // user -> restaurant
    User.hasOne(Restaurant, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    });

    Restaurant.belongsTo(User, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    });


    //force true will drop the table if it already exists
    //alter true will update the table if it already exists
    sequelize.sync({ force: true }).then(() => {
        // console.log('Database Tables synced!');
    });

}

export default Models;