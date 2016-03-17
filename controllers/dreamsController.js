var Dream 							= require('../models').Dream;
var Dreamer 						= require('../models').Dreamer;
var Tag 								= require('../models/tag');
var DreamTag 						= require('../models').DreamTag;

var dreamsController 		= {
	index: function(req, res) {
			var id 						= req.params.id;
			Dreamer.findById({_id: id}, function(err, dreamer) {
				Dream.find({dreamerId: id}, function(err, dreams) {
			    req.currentUser(function(err, currentUser) {
			    	if (currentUser){
			    		res.render('dreams/index', {dreamer: dreamer, dreams: dreams, currentUser: currentUser});
						}else{
							res.redirect("/");
						}
						})
			    });
			});
	},
	create: function(req, res) {
		var description 		= req.body.description;
		var dreamerId     	= req.body.dreamerId;
		var newdream     	 	= {description: description, dreamerId: dreamerId};
		var tag        			= req.body.tags;
		var tagId;
			// console.log('req.body.tags',tag);
				Dream.create(newdream, function(err, newdream) {
					// console.log('inside .body.tags', tag);
						Tag.findOne(tag, function(err, foundTag) {
							console.log(foundTag);
							if(!foundTag) {
								Tag.create(tag, function(err, tag) {
									DreamTag.create({dreamId: newdream._id, tagId: tag._id}, function(err, dreamtag) {
										res.json(newdream);
									});
								});
							} else {
								DreamTag.create({dreamId: newdream._id, tagId: foundTag._id}, function(err, dreamtag) {
									res.json(newdream);
								})
							}

						})

		});
	},
	edit: function(req, res) {
		var id = req.params.id;
		// var description = req.body.description;
		//not grabbing form value
		console.log(req.body.description);
		Dream.findOne({_id: id}, function (err, dream) {
			if (err) console.log(err);
			if (req.body.description) dream.description = req.body.description;
			var obj = {
				description: dream.description
			};
			Dream.update({_id: id}, obj, function(err, dream){
				if (err) console.log(err);
				res.status(200).send();
				// res.render('dreams/index');
			});
			});
	},

	delete: function(req, res) {
		var id = req.params.id;
		console.log(req.params.id);
		Dreamer.findById({_id: id}, function(err, dreamer) {
			Dream.find({dreamerId: id}, function(err, dreams) {
				var dreamId = req.params.id;
				Dream.remove({_id: dreamId}, function(err, doc) {
					err ? console.log(err) : res.status(200).send();
				});
	});
});
},
	search: function(req, res) {
		// console.log('this is hitting the search controller', req.query);
			var searchQuery = req.query.tag;

			// console.log('searchQuery', searchQuery);
			// var dreamers = [];
			Tag.dreams(searchQuery, function(dreams) {
				console.log("sending back dreams", dreams)
				var dreamerIds = dreams.map(function(dream) {
					return dream.dreamerId;
					console.log('dreamerIds', dreamerIds);
				})
				Dreamer.find({_id: { $in: dreamerIds}}, function(err, dreamers) {
					console.log("found dreamers,", dreamers);
					res.send({dreams: dreams, dreamers: dreamers});
				})
		})
				// dreams.forEach(function(dream) {
				// 	Dreamer.findOne({_id: dream.dreamerId}, function(err, dreamer) {
				// 			// return dreamer = dreamer;
				// 			dreamers.push(dreamer);
				// 			console.log("found dreamers", dreamers);
				// 	})
				// })

}

};

module.exports = dreamsController;
