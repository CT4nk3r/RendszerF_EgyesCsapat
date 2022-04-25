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
        if(req.cookies.token == req.sessionID) {
            const maintenances = await Repairer.findAll({
                where: {
                    id: req.user.id    
                },
                include: {model: Maintenance,raw:true}
            })


            let mc = [];

            let date = 0; 

            for(let main of maintenances){
                let newDate = formatDate(main.maintenance.lastInstance)
                newDate = new Date(newDate)
                newDate = newDate.addDays(main.maintenance.period)
                console.log(newDate)
                mc.push({
                    desc: main.maintenance.desc,
                    locationId: main.maintenance.locationId,
                    time: formatDate(newDate)  
                })
            }
            console.log(mc)
            res.render('yourpage.ejs', {data : mc})
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