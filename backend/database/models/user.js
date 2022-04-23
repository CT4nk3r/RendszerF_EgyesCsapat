import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

const User = sequelize.define('user', 
    {
        username: DataTypes.STRING(10),
        password: DataTypes.STRING(513),
        sessionId: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN,
        salt: DataTypes.STRING(21)
    },
    {
        indexes: [
            {
                allowNull: false,
                fields: ['username', 'password', 'salt']
            }
        ],
        tableName: 'users'
    }
);

export default User;