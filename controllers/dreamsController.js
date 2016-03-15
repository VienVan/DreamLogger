var Dream = require('../models').Dream;
var Dreamer = require('../models').Dreamer;
var Tag = require('../models/tag');
var DreamTag = require('../models').DreamTag;

var dreamsController = {
	index: function(req, res) {
		var id = req.params.id;
		Dreamer.findById({_id: id}, function(err, dreamer) {
			res.render('dreams/index', {dreamer: dreamer});
		});

	},
	create: function(req, res) {
		Dreamer.findOne({_id: req.params.id}, function (err, dreamer) {
			if (err) { 
				console.log(err);
			}
				var description = req.body.description;
				// var newTag = req.body.tag;
				var newdream = {description: description};
				var dream = new Dream(newdream);
				// var tag = new Tag(newTag.name);
				// dreamer.dreams.push(dream);
				dreamer.save();
				// var dreamtag = new DreamTag({dreamId: dream._id, tagId: tag._id});
		});
		res.json(dream);
	},
	update: function(req, res) {

	},
	delete: function(req, res) {

	}
};

module.exports = dreamsController;
