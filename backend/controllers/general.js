const controller = {};

controller.getIndex = async function (req, res, next) {
    try {
        if(req.cookies.token == req.sessionID) {
            req.sessionID
            const worksToBeDone = {
            }
            res.render('yourpage.ejs', {data : JSON.stringify(worksToBeDone)})
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