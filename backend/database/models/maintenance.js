import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

const Maintenance = sequelize.define('maintenance',
    {
        desc: DataTypes.STRING,
        lastInstance: DataTypes.DATE,
        period: DataTypes.INTEGER,
        reoccuring: DataTypes.BOOLEAN,
    },
    {
        indexes: [
            {
                allowNull: false,
                fields: ['desc', 'period', 'reoccuring']
            }
        ],
        tableName: 'maintenances'
    }
);

export default Maintenance;