import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

const Object = sequelize.define('object',
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
        tableName: 'objects'
    }
);

export default Object;