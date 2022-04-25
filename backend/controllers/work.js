import Works from '../database/models/works.js';

const controller = {};

controller.getWorks = async (req, res, next) => {
    try {
        let { sessionID } = req.body;
        

        res.send();
    } catch (error) {
        console.error(error);
        res.send({ message: {type: 'error', text: error.message }});
    }
}

export default controller;