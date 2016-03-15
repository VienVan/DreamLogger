var Dream = require('../models').Dream;
var Dreamer = require('../models').Dreamer;
var Tag = require('../models/tag');
var DreamTag = require('../models').DreamTag;

var dreamsController = {
	index: function(req, res) {
		var id = req.params.id;
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
				console.log(req.body);
				// var tag = req.body.tag;
				var description = req.body.description;
				var dreamerId = req.body.dreamerId;
				var newdream = {description: description, dreamerId: dreamerId};


					Dream.create(newdream, function(err, newdream) {
						console.log(newdream);
							res.json(newdream);

				});



	},
	update: function(req, res) {

	},
	delete: function(req, res) {

	},
	createTag: function(req, res) {
		var tag = req.body.name;
		Tag.create(tag, function(err, tag) {
			console.log(tag);
			res.json(tag);
		})

	}
};

module.exports = dreamsController;
