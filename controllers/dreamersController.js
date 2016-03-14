var Dreamer = require('../models/Dreamer');

var dreamersController = {
	index: function(req, res) {
		Dreamer.find({}, function(err, dreamers) {
			res.render('dreamers/index', {dreamers: dreamers});
		})
	},
	create: function(req, res){
		var dreamer = req.body.dreamer;
		var username = dreamer.username;
		var password = dreamer.password;
		var img = dreamer.img;
		console.log(req.body);
		console.log(dreamer);
		console.log(dreamer.img)
		Dreamer.create({username, password, img}, function(err, dreamer) {
			var id = dreamer._id;
			err ? console.log(err) : res.redirect('/dreamers/'+id+'/dreams')
		});
	},
	edit: function(req, res) {
		var id = req.params.id;
		Dreamer.findById({_id: id}, function(err, dreamer) {
			res.render('dreamers/'+id+'edit', {dreamers: dreamer});
		})

	},
};

module.exports = dreamersController;
