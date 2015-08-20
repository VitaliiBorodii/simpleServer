module.exports = function (express) {
    var router = express.Router();
    router.post('/', function (req, res, next) {
        req.session.destroy(function (err, sucess) {
            if (err) return next(err);
            res.redirect('/');
        });
    });
    return router;
};