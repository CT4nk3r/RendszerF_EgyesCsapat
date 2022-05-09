import Maintenance from "../database/models/maintenance.js";
import Repairer from "../database/models/repairer.js";
import formatDate from '../utilities/format-date.js';

const controller = {};

Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }

controller.getIndex = async function (req, res, next) {
    try {
        
        let mc = [];
        let open_maintenance = [];
        
        const no_repairer = await Repairer.findAll({
            where: {
                id: 0
            },
            include: {model: Maintenance,raw:true}
        })

        for(let main of no_repairer){
            let newDate = formatDate(main.maintenance.lastInstance)
            newDate = new Date(newDate)
            newDate = newDate.addDays(main.maintenance.period)
            open_maintenance.push({
                maintenance_id: main.maintenance.id,
                desc: main.maintenance.desc,
                locationId: main.maintenance.locationId,
                time: formatDate(newDate)
            })
        }

        if(req.cookies.token == req.sessionID) {
            const maintenances = await Repairer.findAll({
                where: {
                    id: req.user.id    
                },
                include: {model: Maintenance,raw:true}
            })

            for(let main of maintenances){
                let newDate = formatDate(main.maintenance.lastInstance)
                newDate = new Date(newDate)
                newDate = newDate.addDays(main.maintenance.period)
                let currentDate = new Date()
                if(main.maintenance.reoccuring == true){
                    while (newDate < currentDate){
                        newDate = newDate.addDays(main.maintenance.period)                
                    }
                }
                mc.push({
                    maintenance_id: main.maintenance.id,
                    desc: main.maintenance.desc,
                    locationId: main.maintenance.locationId,
                    time: formatDate(newDate)  
                })
            }
            res.render('yourpage.ejs', {data2: open_maintenance, data : mc})
        }
        else{
            res.render('login.ejs')
        }
    } catch (error) {
        console.error(error);
        res.send(JSON.stringify({ error: error.message }));
    }
}

export default controller;