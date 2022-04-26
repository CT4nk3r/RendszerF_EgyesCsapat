import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

const Issue = sequelize.define('issue',
    {
        comment: DataTypes.STRING
    },
    {
        tableName: 'issues'
    }
);

export default Issue;