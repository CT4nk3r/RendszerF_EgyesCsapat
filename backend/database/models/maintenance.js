import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

const Maintenance = sequelize.define('maintenance',
    {
        desc: DataTypes.STRING,
        lastInstance: DataTypes.DATE,
        period: DataTypes.INTEGER, //in days
        reoccuring: DataTypes.BOOLEAN
    },
    {
        indexes: [
            {
                allowNull: false,
                fields: ['desc', 'lastInstance', 'period', 'reoccuring', 'repairerId', 'locationID', 'objectID']
            }
        ],
        tableName: 'maintenances'
    }
);

export default Maintenance;