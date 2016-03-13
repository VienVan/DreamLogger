// var Dreamer = require('../models/Dreamer');
// var helper = require('../config/helpers');
//
// var sessionsController = {
// 	create: function(req, res, next) {
//
//     // call the next middleware in the stack
//
//
//     var dreamer = req.body.dreamer;
//     var username = dreamer.username;
//     var password = dreamer.password;
//     Dreamer.authenticate(username, password, function (err, dreamer) {
//       // login the dreamer
//       helper.req.login(dreamer);
//       // redirect to user profile
//       console.log(currentUser);
//       res.render("/dreamers/"+ currentUser.id +"/dreams", {dreamer: dreamer});
//     });
//       next();
//
// 	},
// 	delete: function(req, res) {
// 		res.send('delete');
// 	}
// };
//
// module.exports = sessionsController;
