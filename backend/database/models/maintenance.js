import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

const Maintenance = sequelize.define('maintenance',
    {
        desc: DataTypes.STRING,
        lastInstance: DataTypes.DATE,
        period: DataTypes.INTEGER
    },
    {
        indexes: [
            {
                allowNull: false,
                fields: ['desc', 'lastInstance', 'period']
            }
        ],
        tableName: 'maintenances'
    }
);

export default Maintenance;