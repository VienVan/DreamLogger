var Dreamer = require('../models').Dreamer;

var dreamersController = {
	index: function(req, res) {
		Dreamer.find({}, function(err, dreamers) {
			res.render('dreamers/index', {dreamers: dreamers});
		})
	},
	create: function(req, res){
		var dreamer = req.body.dreamer;
		var username = dreamer.username;
		var password = dreamer.password_digest;
		var img = dreamer.img;
		// console.log(req.body);
		// console.log(dreamer);
		// console.log(dreamer.img)
		Dreamer.create({username, password, img}, function(err, dreamer) {
			var id = dreamer._id;
			console.log(id);
			err ? console.log(err) : res.redirect('/dreamers/'+id+'/dreams')
		});
	},
	edit: function(req, res) {
		var id = req.params.id;
		Dreamer.findById({_id: id}, function(err, dreamer) {
			res.render('dreamers/edit', {dreamer: dreamer});
		})
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
