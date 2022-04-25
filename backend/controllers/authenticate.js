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
    const maintenances = await Repairer.findAll({
        where: {
            id: user.id    
        },
        include: {model: Maintenance,raw:true}
    })

    let mc = [];

    let date = 0; 

    for(let main of maintenances){
        let newDate = formatDate(main.maintenance.lastInstance)
        newDate = new Date(newDate)
        newDate = newDate.addDays(main.maintenance.period)
        mc.push({
            desc: main.maintenance.desc,
            locationId: main.maintenance.locationId,
            time: formatDate(newDate)  
        })
    }
    res.render('yourpage.ejs', {data : mc})
}

const sendResponseOnFailedLogin = (res) => {
    res.send({ message: { text: "Hibás felhasználónév, vagy jelszó!", type: 'error' }});
}

export default controller;