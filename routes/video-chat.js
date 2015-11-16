module.exports = function (express) {
    var router = express.Router();
    router.get('/', function (req, res, next) {
        var name = req.session.userName;
        res.render('video', {title: name, logged: true});
    });
    return router;
};


