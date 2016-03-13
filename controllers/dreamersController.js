var Dreamer = require('../models/Dreamer');

var dreamersController = {
	index: function(req, res) {
		res.render('dreamers/index');
	},
	create: function(req, res) {

	},
	edit: function(req, res) {
		res.render('dreamers/edit');
	},
	update: function(req, res) {

	}
};

module.exports = dreamersController;
