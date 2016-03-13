//DEPENDENCIES
var express 						= require('express'),
		router 							= express.Router(),
		bodyParser 					= require('body-parser'), //do we need these two in here?
		methodOverride 			= require('method-override');
//MODELS
var dreamersController 	= require('../controllers/dreamersController');
var dreamsController 		= require('../controllers/dreamsController');
var pagesController 		= require('../controllers/pagesController');
var sessionsController 		= require('../controllers/sessionsController');
//Dreamer API

//DREAMERS
router.route('/')													//root
			.get(pagesController.index);
			// .post(sessionsController.create);
router.route('/dreamers')									//show all users
 			.get(dreamersController.index)
			.post(dreamersController.create);
// router.route('/dreamers/:id/edit')				//edit view to edit users
			// .get(dreamersController.edit);
// router.route('/dreamers/:id')							//update users
			// .put(dreamersController.update);
//DREAMS
router.route('/dreamers/:id/dreams')			//show all user's dreams (timeline)
			.get(dreamsController.index)
			.post(dreamsController.create)
			.put(dreamsController.update)
			.delete(dreamsController.delete);
router.route('/dreamers/:id/dreams/new')	//view for creating new dreams
			// .get(dreamsController.new);
// router.route(['/dreamers', '/signup'])
// 			.post(dreamersController.create)


module.exports = router;
