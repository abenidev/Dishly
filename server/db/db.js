import { Sequelize } from 'sequelize';
import config from './config.js';


export function connectDB() {
    config.development.mariadb.client = connectToPostgres();
}


function connectToPostgres() {
    const sequelize = new Sequelize(config.development.mariadb.options);
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    })
    return sequelize;
}
