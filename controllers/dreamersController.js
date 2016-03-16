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
		var username = dreamer.username;
		var password = dreamer.password_digest;
		var img = dreamer.img;
		Dreamer.create({username: username, password_digest: password, img: img}, function(err, dreamer) {
			var id = dreamer._id;
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
	signup: function (req, res) {
		  // grab the user from the params
  var dreamer = req.body.dreamer;
  // pull out their email & password
  var username = dreamer.username;
  var password = dreamer.password;
  // create the new user
  Dreamer.createSecure(username, password, function(err, dreamer) {
    req.login(dreamer);
    res.redirect("/pages/about");
  });
}
};


module.exports = dreamersController;
