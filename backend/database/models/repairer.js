import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

const Repairer = sequelize.define('repairer',
    {
        username: DataTypes.STRING(10),
        password: DataTypes.STRING(513),
        isAdmin: DataTypes.BOOLEAN,
        sessionId: DataTypes.STRING,
        salt: DataTypes.STRING(21),
        proficiency: DataTypes.INTEGER
    },
    {
        indexes: [
            {
                allowNull: false,
                fields: ['username', 'password', 'salt']
            }
        ],
        tableName: 'repairers'
    }
);

export default Repairer;