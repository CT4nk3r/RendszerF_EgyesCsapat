import Object from '../database/models/object.js';

const controller = {};

controller.postAddObject = async (req, res, next) => {
    try {
        let { name, parentId } = req.body;
        parentId = parentId ?? null;

        await Object.create({
            name,
            parentId
        })

        res.send({ message: { type: 'success', text: 'Object generated successfully.' }});
    } catch (error) {
        console.error(error);
        res.send({ message: {type: 'error', text: error.message }});
    }
}

export default controller;