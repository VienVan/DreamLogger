var Dream 							= require('../models').Dream;
var Dreamer 						= require('../models').Dreamer;
var Tag 								= require('../models/tag');
var DreamTag 						= require('../models').DreamTag;

var dreamsController 		= {
	index: function(req, res) {
			var id 						= req.params.id;
			Dreamer.findById({_id: id}, function(err, dreamer) {
				Dream.find({dreamerId: id}, function(err, dreams) {
			    req.currentUser(function(err, currentUser) {
			    	if (currentUser){
			    		res.render('dreams/index', {dreamer: dreamer, dreams: dreams, currentUser: currentUser});
						}else{
							res.redirect("/");
						}
			    });
			});
		});
	},
	create: function(req, res) {
		var description 		= req.body.description;
		var dreamerId     	= req.body.dreamerId;
		var newdream     	 	= {description: description, dreamerId: dreamerId};
		var newTag        	= req.body.tags;
		var tagId;

			console.log('req.body.tags',newTag);

				Dream.create(newdream, function(err, newdream) {
						Tag.create(newTag, function(err, tag) {
							DreamTag.create({dreamId: newdream._id, tagId: tag._id}, function(err, dreamtag) {
								res.json(newdream);
							});
						});
		});
	},
	update: function(req, res) {

	},
	delete: function(req, res) {

	}
};

module.exports = dreamsController;
