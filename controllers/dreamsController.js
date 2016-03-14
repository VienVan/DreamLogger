var Dream = require('../models/Dreamer');

var dreamsController = {
	index: function(req, res) {
		res.render('dreams/index');
	},
	create: function(req, res) {
		// Dreamer.findOne

		var description = req.body.description;
		var tags = req.body.tags;
		var newdream = {description: description, tags: tags};
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
