import { Sequelize } from 'sequelize';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { connection, username, password } = require('../config/database.json');

const sequelize = new Sequelize(connection, username, password, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const databaseConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database: ' + error);
    }
}

export { sequelize, databaseConnect };