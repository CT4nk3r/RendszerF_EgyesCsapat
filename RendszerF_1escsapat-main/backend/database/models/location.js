import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

const Location = sequelize.define('location',
    {
        name: DataTypes.STRING(100)
    },
    {
        indexes: [
            {
                allowNull: false,
                fields: ['name']
            }
        ],
        tableName: 'locations'
    }
);

export default Location;