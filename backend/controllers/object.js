import Object from '../database/models/object.js';

const controller = {};

controller.postAddObject = async (req, res, next) => {
    try {
        let { name, locationId } = req.body;
        locationId = locationId ?? null;

        await Object.create({
            name,
            locationId
        })

        res.send({ message: { type: 'success', text: 'Object generated successfully.' }});
    } catch (error) {
        console.error(error);
        res.send({ message: {type: 'error', text: error.message }});
    }
}

export default controller;