var Dreamer = require('../models/Dreamer');

var dreamsController = {
	index: function(req, res) {
		var id = req.params.id
		Dreamer.findById({_id: id}, function(err, dreamer) {
			res.render('dreams/index', {dreamer: dreamer});
		})

	},
	create: function(req, res) {
		var dreams = req.body.dreams;

	},
	update: function(req, res) {

	},
	delete: function(req, res) {

	}
};

module.exports = dreamsController;
