var Dreamer = require('../models').Dreamer;

var sessionsController = {
	login: function(req, res){
	var dreamer = req.body.dreamer;
  var username = dreamer.username;
  var password = dreamer.password;

	  Dreamer.authenticate(username, password, function (err, dreamer) {

      // login the user
	    req.login(dreamer);
	    // redirect to user profile
	    res.redirect("/dreamers/"+dreamer._id+"/dreams");
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
    console.log("Cookie: ", req.session);
    res.redirect("/pages/about");
  });
 }
};

module.exports = sessionsController;
