var Dreamer = require('../models').Dreamer;

var sessionsController = {
	login: function(req, res){
	var dreamer = req.body.dreamer;   //dreamer
  var username = dreamer.username;
  var password = dreamer.password;

//Al's code with dreamer login authentication//
	  Dreamer.authenticate(username, password, function (err, dreamer) {
	    if (err) { 
        res.redirect('/');
      }
      else {
	    // login the user
	    req.login(dreamer);
	    console.log('logged in dreamer: ', dreamer);
	    // redirect to user profile
	    res.redirect("/dreamers/"+dreamer._id+"/dreams");
	}
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
 },
	delete: function(req, res){

	}
};

module.exports = sessionsController;
