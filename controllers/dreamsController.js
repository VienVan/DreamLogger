var Dream = require('../models').Dream;
var Dreamer = require('../models').Dreamer;

var dreamsController = {
	index: function(req, res) {
		var id = req.params.id
		Dreamer.findById({_id: id}, function(err, dreamer) {
			res.render('dreams/index', {dreamer: dreamer});
		})

	},
	create: function(req, res) {
		var description = req.body.description;
		var tag = req.body.tag;
		var newdream = {description: description, tag: tag};
		Dream.create(newdream, function (err) {
			if (err) {
				console.log(err);
			} res.send(200);
		});

	},
	update: function(req, res) {

	},
	delete: function(req, res) {

	}
};

module.exports = dreamsController;
