//DEPENDENCIES
var express 						= require('express'),
		router 							= express.Router(),
		bodyParser 					= require('body-parser'), //do we need these two in here?
		methodOverride 			= require('method-override');
//MODELS
var dreamersController 	= require('../controllers/dreamersController');
var dreamsController 		= require('../controllers/dreamsController');
var pagesController 		= require('../controllers/pagesController');
//Dreamer API

//DREAMERS
router.route('/')													//root
			.get(pagesController.index);
router.route('/dreamers')									//show all users
 			.get(dreamersController.index)
			.post(dreamersController.create);
router.route('/dreamers/:id/edit')				//edit view to edit users
			.get(dreamersController.edit);
router.route('/dreamers/:id')							//update users
			.put(dreamersController.update);
//DREAMS
router.route('/dreamers/:id/dreams')			//show all user's dreams (timeline)
			.get(dreamsController.index)
			.post(dreamsController.create)
			.put(dreamsController.update)
			.delete(dreamsController.delete);
router.route('/dreamers/:id/dreams/new')	//view for creating new dreams
			.get(dreamsController.new);

//ABOUT
router.route('/pages/about')													//root
			.get(pagesController.about); //view for about dreamr			

//EDIT
router.route('/dreamers/edit')													//root
			.get(pagesController.edit);
module.exports = router;
