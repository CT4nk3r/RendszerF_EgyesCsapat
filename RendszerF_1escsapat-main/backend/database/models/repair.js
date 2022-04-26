import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

const Repair = sequelize.define('repair',
    {
        comment: DataTypes.STRING,
    },
    {
        tableName: 'repairs'
    }
);

export default Repair;