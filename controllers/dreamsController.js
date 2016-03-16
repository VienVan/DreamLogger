var Dream = require('../models').Dream;
var Dreamer = require('../models').Dreamer;
var Tag = require('../models/tag');
var DreamTag = require('../models').DreamTag;

var dreamsController = {
	index: function(req, res) {
		var id 							= req.params.id;
		console.log(req.params.id);
		Dreamer.findById({_id: id}, function(err, dreamer) {
			Dream.find({dreamerId: id}, function(err, dreams) {

				res.render('dreams/index', {dreamer: dreamer, dreams: dreams});
			});
			// res.render('dreams/index', {dreamer: dreamer});
		});

	},
	create: function(req, res) {

				// var description = req.body.description;
				// console.log(req.body);
				// var tag = req.body.tag;
				var description = req.body.description;
				var dreamerId 	= req.body.dreamerId;
				var newdream 		= {description: description, dreamerId: dreamerId};
				var newTag 			= {name: req.body.tags.name};
				var tagQuery 		=
				// console.log(req.body.tags);

					Dream.create(newdream, function(err, newdream) {
						console.log(newdream);

							Tag.create(newTag, function(err, tag) {
								res.json(newdream);
							});

				});



	},
	edit: function(req, res) {
		// var id = req.params.id;
		// Dream.findOne({_id: id}, function (err, dream) {
		// 	console.log(dream);
		// 	if (err) { console.log('error', err);}
		// 	dream.description = req.body.description;
		// 	dream.save(function (err, saved) {
		// 		if (err) { console.log('error', err);}
		// 		res.status(200).send();
		// 	});

		// });
	},

	// 				Dream.findOne({_id: dreamId}, function(err, dream) {
// 					console.log("Dream: ", dream);
// 					if (err) { console.log('error', err);}
// 					dream.description = req.body.description;
// 					dream.save(function (err, saved) {
// 						if (err) { console.log('error', err); }
// 						res.status(200).send();

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
}
};

// var id = req.params.id;
// 		console.log(req.params.id);
// 		Dreamer.findById({_id: id}, function(err, dreamer) {
// 			Dream.find({dreamerId: id}, function(err, dreams) {
// 				var dreamId = req.params.id;
// 				console.log("dreams: ", dreams)
// 				console.log("dreamid: ", dreamId);
// 				Dream.findOne({_id: dreamId}, function(err, dream) {
// 					console.log("Dream: ", dream);
// 					if (err) { console.log('error', err);}
// 					dream.description = req.body.description;
// 					dream.save(function (err, saved) {
// 						if (err) { console.log('error', err); }
// 						res.status(200).send();
// 					});
// 				});	
// 			});
module.exports = dreamsController;
