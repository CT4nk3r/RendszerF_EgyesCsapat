import crypto from 'crypto';
import fs from 'fs';
import User from '../database/models/user.js';
import generateRandomString from '../utilities/generate-random-string.js';
import Repairer from '../database/models/repairer.js';
import Maintenance from '../database/models/maintenance.js';
import Category from '../database/models/category.js';

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
        let { username, password, isAdmin, proficiency } = req.body;

        const salt =  generateRandomString(20);

        await Repairer.create({
            username,
            password: crypto.pbkdf2Sync(password, salt, 10000, 64, `sha512`).toString('hex'),
            isAdmin,
            salt,
            proficiency
        });

        res.send({
            message: {
                type: 'success',
                text: 'Repairer was created successfully!'
            }
        })
    } catch (error) {
        console.error(error);
        res.send(JSON.stringify({ error: error.message }));
    }
}

controller.postAddCategory = async(req, res, next) => {
    try{
        let {categoryName} = req.body;

        console.log(req.body)
        await Category.create({
            categoryName
        });
        res.send({
            message: {
                type: 'success',
                text: 'Category was added!'
            }
        })
    }catch (error){
        console.error(error);
        res.send(JSON.stringify({ error: error.message }));
    }
}

controller.postAddMaintenance = async (req, res, next) => {
    try {
        let { desc, lastInstance, period, reoccuring, repairerId, locationId, objectId } = req.body;

        console.log(req.body)
        await Maintenance.create({
            desc,
            lastInstance,
            period,
            reoccuring,
            repairerId,
            locationId,
            objectId
        });
        res.send({
            message: {
                type: 'success',
                text: 'Maintenance was added!'
            }
        })
    } catch (error) {
        console.error(error);
        res.send(JSON.stringify({ error: error.message }));
    }
}

controller.postAcceptMaintenance = async (req, res, next) =>{
    try{
        let { userID, taskID } = req.body;

        console.log(req.body)

        const maintenance = await Maintenance.findOne({
            where: {
                id: taskID
            }
        })

        await maintenance.update({
            repairerId: userID
        })


        res.send({
            message: {
                type: 'success',
                text: 'Job accepted!'
            }
        }) 
    }catch(error){
        console.error(error);
        res.send(JSON.stringify({ error: error.message }));
    }
}

controller.postDeclineMaintenance = async (req, res, next) =>{
    try{
        let { userID, taskID } = req.body;

        console.log(req.body)

        const maintenance = await Maintenance.findOne({
            where: {
                id: taskID
            }
        })

        await maintenance.update({
            repairerId: 0
        })


        res.send({
            message: {
                type: 'success',
                text: 'Job declined!'
            }
        }) 
    }catch(error){
        console.error(error);
        res.send(JSON.stringify({ error: error.message }));
    }
}

controller.postDoneMaintenance = async (req, res, next) =>{
    try{
        res.send({
            message: {
                type: 'success',
                text: 'Job done!'
            }
        })      
    }catch(error){
        console.error(error);
        res.send(JSON.stringify({ error: error.message }));
    }
}


export default controller;