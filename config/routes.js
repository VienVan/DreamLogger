var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

var dreamersController = require('../controllers/dreamersController');
var dreamsController = require('../controllers/dreamsController');
//Dreamer API

router.route('/dreamers')
 	.get(dreamersController.getAll);

router.route('/dreams')
	.get(dreamsController.getAll)
// 	.post(dreamsController.createDream);
//
// router.get('/dreams/new', dreamsController.newDream);
//
// router.route('/dreams/:id')
// 	.get(dreamsController.getDream)
// 	.put(dreamsController.updateDream)
// 	.delete(dreamsController.removeDream);





 module.exports = router;
