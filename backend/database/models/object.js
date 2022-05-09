import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

const Object = sequelize.define('object',
    {
        name: DataTypes.STRING(100),
        category: DataTypes.INTEGER
    },
    {
        indexes: [
            {
                allowNull: false,
                fields: ['name', 'category']
            }
        ],
        tableName: 'objects'
    }
);

export default Object;