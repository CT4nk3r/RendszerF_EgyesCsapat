const controller = {};

controller.getIndex = async function (req, res, next) {
    try {
        if(req.cookies.loggedin == "true") {
            console.log(req.cookies.loggedin)
            console.log(req.cookies.connect.sid)
            res.render('yourpage.ejs', {data: "already logged in"})
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