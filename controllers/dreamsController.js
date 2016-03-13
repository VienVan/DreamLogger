// var Dreamer = require('../models/dreamer');

var dreamsController = {
	index: function(req, res) {
		res.render('dreams/index');
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
