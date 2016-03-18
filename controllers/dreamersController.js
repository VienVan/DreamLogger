var Dream 							= require('../models').Dream;
var Dreamer 						= require('../models').Dreamer;
var Tag 								= require('../models/tag');
var DreamTag 						= require('../models').DreamTag;

var dreamersController = {
	index: function(req, res) {
		Dreamer.find({}, function(err, dreamers) {
			req.currentUser(function(err, currentUser) {
				DreamTag.find({}, function( err, dreamtags) {
					Dream.find({}, function( err, dreams) {
						var targetTagIds = dreamtags.map(function(dreamtag) {
							return dreamtag.tagId;
						});
						Tag.find({_id: { $in: targetTagIds}}, function(err, tags) {
							if (currentUser){
								res.render('dreamers/index', {dreamers: dreamers, currentUser: currentUser, tags: tags});
							} else {
								res.redirect("/");
							}
						});
					});
				});
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
			res.render('dreamers/edit', {dreamer: dreamer});
		});
	},
	//Profile form update (al)
	update: function(req, res) {
		var id = req.params.id;
		var dreamer = req.body.dreamer;
		// console.log('user id', id);
		var username = dreamer.username;
		var password = dreamer.password;
		var img = dreamer.img;
		Dreamer.findOne({_id: id}, function (err, dream) {
			if (err) console.log(err);
			if (username) Dreamer.username = username;
			if (password) Dreamer.password = password;
			if (img) Dreamer.img = img;
			var updatedDreamer = {
				username: Dreamer.username,
				password: Dreamer.password,
				img: Dreamer.img
			};
			Dreamer.update({_id: id}, updatedDreamer, function (err, dreamer) {
				if (err) console.log(err);
				res.status(200).send();
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
