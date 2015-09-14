var handlers = require('../libs/crudHandlers')('messages');

module.exports = function (express) {
    var router = express.Router();
    router.get('/', function (req, res, next) {
        var userId = req.session.userId;
        if (!userId) {
            return res.sendStatus(401);
        }
        handlers.list(req, res, next);
    });
    router.put('/', function (req, res, next) {
        var userId = req.session.userId;
        if (!userId) {
            return res.sendStatus(401);
        }
        req.middle = {
            conditions: {
                userId: userId
            }
        };
        handlers.update(req, res, next);
    });
    return router;
};