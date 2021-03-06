module.exports = function (express) {
    var router = express.Router();
    router.get('/', function (req, res, next) {
        var logged,
            title = 'Home page';
        if (req.session.userId) {
            logged = true;
            title = req.session.userName + ' - Home page';
        }
        res.render('index', {title: title, logged: logged});
    });
    return router;
};