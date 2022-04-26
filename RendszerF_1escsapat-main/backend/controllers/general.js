
const controller = {};

controller.getIndex = async function (req, res, next) {
    try {
        res.send({ message: 'Success!' });
    } catch (error) {
        console.error(error);
        res.send(JSON.stringify({ error: error.message }));
    }
}

export default controller;