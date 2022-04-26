import { sequelize } from '../sequelize.js';

const Equipment = sequelize.define('equipment',{},
    {
        tableName: 'equipments'
    }
);

export default Equipment;