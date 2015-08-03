var express = require('express');
var router = express.Router();
var handlers = require('../libs/crudHandlers')('todos');
var async = require('async');

router.get('/', handlers.list);

router.get('/:id', handlers.get);

router.post('/', handlers.create);

router.put('/:id', handlers.update);

router.delete('/:id', handlers.remove);

module.exports = router;