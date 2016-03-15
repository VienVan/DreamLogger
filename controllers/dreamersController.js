var Dreamer = require('../models').Dreamer;

var dreamersController = {
	index: function(req, res) {
		Dreamer.find({}, function(err, dreamers) {
			req.currentUser(function(err, currentUser) {
				if (currentUser){
					res.render('dreamers/index', {dreamers: dreamers, currentUser: currentUser});
				}else{
					res.redirect("/");
				}
    	});
		});
	},
	create: function(req, res){
		var dreamer = req.body.dreamer;
		var id = dreamer._id;
		var username = dreamer.username;
		var password = dreamer.password_digest;
		var img = dreamer.img;
		Dreamer.create({username: username, password_digest: password, img: img}, function(err, dreamer) {
			if (err) {
				console.log(err);
			}else{
				req.login(dreamer);
				res.redirect('/dreamers/'+id+'/dreams');
			}
		});
	},
	edit: function(req, res) {
		var id = req.params.id;
		Dreamer.findById({_id: id}, function(err, dreamer) {
			req.currentUser(function(err, currentUser) {
				if (currentUser){
					res.render('dreamers/edit', {dreamer: dreamer, currentUser: currentUser});
				}else{
					res.redirect("/");
				}			
			});
		});
	},
};


module.exports = dreamersController;
