import { sequelize } from './sequelize.js';

// Import models
import User from './models/user.js';
import Location from './models/location.js';
import Repairer from './models/repairer.js';
import Object from './models/object.js';
import Issue from './models/issue.js';
import Repair from './models/repair.js';
import Maintenance from './models/maintenance.js';
import Equipment from './models/equipment.js';

// Define connections
export default async () => {
    try {
        // ----- Issue -----
        Equipment.hasOne(Issue, { constraints: true, onDelete: 'CASCADE', foreignKey: 'equipmentId' });
        Issue.belongsTo(Equipment, { constraints: false });
        User.hasOne(Issue, { constraints: true, onDelete: 'CASCADE', foreignKey: 'userId' });
        Issue.belongsTo(User, { constraints: false });
        
        // ----- Repair -----
        Issue.hasOne(Repair, { constraints: true, onDelete: 'CASCADE', foreignKey: 'issueId' });
        Repair.belongsTo(Issue, { constraints: false });
        Repairer.hasOne(Repair, { constraints: true, onDelete: 'CASCADE', foreignKey: 'repairerId' });
        Repair.belongsTo(Repairer, { constraints: false });

        // ----- Maintenance -----
        Location.hasOne(Maintenance, { constraints: true, onDelete: 'CASCADE', foreignKey: 'locationId' });
        Maintenance.belongsTo(Location, { constraints: false });
        Object.hasOne(Maintenance, { constraints: true, onDelete: 'CASCADE', foreignKey: 'objectId' });
        Maintenance.belongsTo(Object, { constraints: false });
        Repairer.hasOne(Maintenance, { constraints: true, onDelete: 'CASCADE', foreignKey: 'repairerId' });
        Maintenance.belongsTo(Repairer, { constraints: false });

        // ----- Equipment -----
        Location.hasOne(Equipment, { constraints: true, onDelete: 'CASCADE', foreignKey: 'locationId' });
        Equipment.belongsTo(Location, { constraints: false });
        Object.hasOne(Equipment, { constraints: true, onDelete: 'CASCADE', foreignKey: 'objectId' });
        Equipment.belongsTo(Object, { constraints: false });

        // ----- Object -----
        Location.hasOne(Object, { constraints: true, onDelete: 'CASCADE', foreignKey: 'locationId' });
        Object.belongsTo(Location, { constraints: false });

        await sequelize.sync({ alter: true }); // Alter on model change
    } catch(error) {
        console.error(error);
    }
};
