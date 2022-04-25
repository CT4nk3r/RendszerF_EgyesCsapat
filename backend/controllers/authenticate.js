import crypto from 'crypto';
import User from '../database/models/user.js';
import { sessionStore } from '../database/session.js';
import Repairer from '../database/models/repairer.js';

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
                res.cookie("token",user.sessionId)
            }
            if(req.sessionID == user.sessionId){
                res.cookie("loggedin","true")
            }
            delete user.password;
            delete user.salt;

            req.session.isLoggedIn = true;
            req.session.user = user;

            return await req.session.save((err) => {
                return sendResponseOnSuccessfulLogin(res, user);
            });
        } else
            return sendResponseOnFailedLogin(res);
    } catch (error) {
        console.error(error);
        return res.send({ error: error.message });
    }
}

const sendResponseOnSuccessfulLogin = (res, user) => {
    const worksToBeDone = {
        message: {
            type: 'success',
            text: 'Authentication was successful!'
        },
        expiresIn: "One Week",
        user: JSON.stringify({
            id: user.id,
            username: user.username,
        }),
        sessionId: user.sessionId
    }
    res.render('yourpage.ejs', {data : JSON.stringify(worksToBeDone)})
}

const sendResponseOnFailedLogin = (res) => {
    res.send({ message: { text: "Hibás felhasználónév, vagy jelszó!", type: 'error' }});
}

export default controller;