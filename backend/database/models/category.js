import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

const Category = sequelize.define('category',
    {
        categoryName: DataTypes.STRING(100)
    },
    {
        indexes: [
            {
                allowNull: false,
                fields: ['categoryName']
            }
        ],
        tableName: 'category'
    }
);

export default Category;