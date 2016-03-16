//DEPENDENCIES
var express 						= require('express'),
		router 							= express.Router(),
		bodyParser 					= require('body-parser'), //do we need these two in here?
		methodOverride 			= require('method-override');
//MODELS
var dreamersController 	= require('../controllers/dreamersController');
var dreamsController 		= require('../controllers/dreamsController');
var pagesController 		= require('../controllers/pagesController');
var sessionsController 	= require('../controllers/sessionsController');

//Dreamer API

//DREAMERS
router.route('/')													//root
			.get(pagesController.index);

router.route('/dreamers')									//show all users
 			.get(dreamersController.index)
 			.post(dreamersController.signup);
router.route('/dreamers/:id/edit')				//edit view to edit users
			.put(dreamersController.edit);
router.route('/dreamers/:id');						//update users

// DREAMS
router.route('/dreamers/:id/dreams')			//show all user's dreams (timeline)
			.get(dreamsController.index)
			.post(dreamsController.create)
			.delete(dreamsController.delete);
router.route('/dreamers/tags')
			.post(dreamsController.createTag);
//ABOUT
router.route('/pages/about')													//root
			.get(pagesController.about); //view for about dreamr

//LOGIN
router.route('/pages/login')
			.get(pagesController.login);

router.route('/sessions')
			.post(sessionsController.create);

module.exports = router;
