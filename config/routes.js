var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

var dreamersController = require('../controllers/dreamersController');

//Dreamer API

router.route('/dreamers')
 .get(dreamersController.getAll);





 module.exports = router;