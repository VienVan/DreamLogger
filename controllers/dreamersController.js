var Dreamer = require('../models/Dreamer');

var dreamersController = {
	index: function(req, res) {
		res.render('dreamers/index');
	},
	create: function(req, res){
		var dreamer = req.body.dreamer;
		var username = dreamer.username;
		var password = dreamer.password;

		Dreamer.create({username, password}, function(err, dreamer) {
			var id = dreamer._id;
			console.log(id);
			err ? console.log(err) : res.redirect('/dreamers/'+id+'/dreams')
		});
	},

	edit: function(req, res) {
		res.render('dreamers/edit');
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


