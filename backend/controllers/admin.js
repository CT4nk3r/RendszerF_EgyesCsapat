import crypto from 'crypto';
import fs from 'fs';
import User from '../database/models/user.js';
import generateRandomString from '../utilities/generate-random-string.js';
import Repairer from '../database/models/repairer.js';

const controller = {};

controller.postGenerateUsers = async (req, res, next) => {
    try {
        const users = [];

        for(let i = 0; i < 50; i++){
            const user = {
                password: generateRandomString(10, true),
                username: generateRandomString(6, true).toUpperCase(),
            }
            users.push(user);        
            
            const  existingUser = await User.findOne({
                where: {
                    username: user.username
                }
            });
    
            if(existingUser)
                await existingUser.destroy();
    
            const salt = generateRandomString(20);
    
            await User.create({
                username: user.username,
                name: user.name,
                password: crypto.pbkdf2Sync(user.password, salt, 10000, 64, `sha512`).toString('hex'),
                salt
            })
        }
        
        const userNames = await User.findAll({
            attributes: [
                "username"
            ],
            raw: true,
            order: [["username", "ASC"]]
        })
        console.log(userNames)


        let csvContent = 'Username;Password\n'
        for(let user of users) {
            csvContent += `${user.username};$;${user.password}\n`
        }

        fs.writeFile('./data/users.csv', csvContent, (err) => {
            if (err) throw err;
            console.log('Users generated successfully!');
            res.send(JSON.stringify({ users }));
        });

    } catch (error) {
        console.error(error);
        res.send(JSON.stringify({ error: error.message }));
    }
}

controller.postAddRepairer = async (req, res, next) => {
    try {
        let { username, password, isAdmin } = req.body;

        const salt =  generateRandomString(20);

        await Repairer.create({
            username,
            password: crypto.pbkdf2Sync(password, salt, 10000, 64, `sha512`).toString('hex'),
            isAdmin,
            salt
        });

        res.send({
            message: {
                type: 'success',
                text: 'Generation was successful!'
            }
        })
    } catch (error) {
        console.error(error);
        res.send(JSON.stringify({ error: error.message }));
    }
}

export default controller;