var Dream = require('../models').Dream;
var Dreamer = require('../models').Dreamer;
var Tag = require('../models/tag');
var DreamTag = require('../models').DreamTag;

var dreamsController = {
	index: function(req, res) {
		var id 							= req.params.id;
		console.log(req.params.id);
		Dreamer.findById({_id: id}, function(err, dreamer) {
			Dream.find({dreamerId: id}, function(err, dreams) {

				res.render('dreams/index', {dreamer: dreamer, dreams: dreams})
			})
			// res.render('dreams/index', {dreamer: dreamer});
		});

	},
	create: function(req, res) {

				var description = req.body.description;
				// console.log(req.body);
				// var tag = req.body.tag;
				var description = req.body.description;
				var dreamerId 	= req.body.dreamerId;
				var newdream 		= {description: description, dreamerId: dreamerId};
				var newTag 			= {name: req.body.tags.name};
				var tagQuery 		=
				// console.log(req.body.tags);

					Dream.create(newdream, function(err, newdream) {
						console.log(newdream);

							Tag.create(newTag, function(err, tag) {
								res.json(newdream);
							});

				});



	},
	update: function(req, res) {

	},
	delete: function(req, res) {

	}
};

module.exports = dreamsController;
