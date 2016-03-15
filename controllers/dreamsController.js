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
		req.currentUser(function(err, dreamer) {
        if (err) { 
				console.log(err);
			}
				var description = req.body.description;
				var tag = req.body.tag;
				var newdream = {description: description, tag: tag};
				Dream.create(newdream, function(err, dream) {
						console.log(dream);
						res.json(dream);
				});
				// var dreamtag = new DreamTag({dreamId: dream._id, tagId: tag._id});
		});
		
	},
	update: function(req, res) {

	},
	delete: function(req, res) {

	}
};

module.exports = dreamsController;
