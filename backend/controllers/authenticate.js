import crypto from 'crypto';
import User from '../database/models/user.js';
import { sessionStore } from '../database/session.js';
import Repairer from '../database/models/repairer.js';
import Maintenance from '../database/models/maintenance.js';
import formatDate from '../utilities/format-date.js';

const controller = {};

controller.postLogin = async (req, res, next) => {
    try {
        let { username, password } = req.body;

        let user = await User.findOne({
            where: {
                username
            }
        });

        if(!user)
            user = await Repairer.findOne({
                where: {
                    username
                }
            })

        if(!user)
            return sendResponseOnFailedLogin(res);

        const hash = crypto.pbkdf2Sync(password, user?.salt, 10000, 64, `sha512`).toString('hex');


        if(hash === user?.password) {
            if (user.sessionId != req.sessionID) {
                await sessionStore.sessionModel.destroy({ where: { sid: user.sessionId } });
                await user.update({
                    sessionId: req.sessionID
                });
            }
            
            delete user.password;
            delete user.salt;

            req.session.isLoggedIn = true;
            req.session.user = user;

            res.cookie("token",user.sessionId)
            res.cookie("userID",user.id)
            if(user.isAdmin == true){
                res.cookie("isAdmin", "true")
            }else{
                res.cookie("isAdmin", "false")
            }
            return await req.session.save(async (err) => {
                return await sendResponseOnSuccessfulLogin(res, user);
            });
        } else
            return sendResponseOnFailedLogin(res);
    } catch (error) {
        console.error(error);
        return res.send({ error: error.message });
    }
}

const sendResponseOnSuccessfulLogin = async (res, user) => {
    try{
        let mc = [];
        let open_maintenance = [];
    
        const maintenances = await Repairer.findAll({
            where: {
                id: user.id    
            },
            include: {model: Maintenance,raw:true}
        })
        const no_repairer = await Repairer.findAll({
            where: {
                id: 0
            },
            include: {model: Maintenance,raw:true}
        })
    
        for(let main of no_repairer){
            if(main.maintenance?.lastInstance){
                let newDate = formatDate(main.maintenance.lastInstance)
                newDate = new Date(newDate)
                newDate = newDate.addDays(main.maintenance.period)
                open_maintenance.push({
                    maintenance_id: main.maintenance.id,
                    desc: main.maintenance.desc,
                    locationId: main.maintenance.locationId,
                    time: formatDate(newDate)
                })
            }else{
                res.render('yourpage.ejs', { data : mc })
            }
        }
    
        for(let main of maintenances){
            if(main.maintenance?.lastInstance){
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
            else{
                res.render('yourpage.ejs', { data : mc })
            }
        }
        res.render('yourpage.ejs', { data2: open_maintenance, data : mc })
    }catch(error){
        console.error(error);
        res.send(JSON.stringify({ error: error.message }));
    }
}

const sendResponseOnFailedLogin = (res) => {
    res.send({ message: { text: "Hib??s felhaszn??l??n??v, vagy jelsz??!", type: 'error' }});
}

export default controller;