var Dreamer = require('../models').Dreamer;

var sessionsController = {
	create: function(req, res){
	var dreamer = req.body.dreamer;
  var username = dreamer.username;
  var password = dreamer.password;

	  Dreamer.authenticate(username, password, function (err, dreamer) {
	    // login the user
	    req.login(dreamer);
	    // redirect to user profile
	    res.redirect("/");
	  });
	},
	delete: function(req, res){

	}
};

module.exports = sessionsController;
