var Dream 							= require('../models').Dream;
var Dreamer 						= require('../models').Dreamer;
var Tag 								= require('../models/tag');
var DreamTag 						= require('../models').DreamTag;
var rp			 						= require('request-promise');
var request 						= require('request');
var cheerio 						= require('cheerio');

var dreamsController 		= {
	index: function(req, res) {
		var id = req.params.id;
		Dreamer.findById({_id: id}, function(err, dreamer) {
			Dream.find({dreamerId: id}, function(err, dreams) {
		    req.currentUser(function(err, currentUser) {
		    	if (req.xhr){
		    		res.json({dreams: dreams});
		    	}else{
			    	if (currentUser){
			    		res.render('dreams/index', {dreamer: dreamer, dreams: dreams, currentUser: currentUser});
						}
						else{res.redirect("/");}
					}			
		    });
			});
		});
	},
	create: function(req, res) {
		var description 		= req.body.description;
		var dreamerId     	= req.body.dreamerId;
		console.log("dreamerId:",dreamerId);
		console.log("params.id", req.params.id);
		var anewdream     	= {description: description, dreamerId: dreamerId};
		var tag        			= req.body.tags;
		var tagId;

		var postOptions = {
			url: 'http://www.thecuriousdreamer.com/dreamdictionary/',
		  form: {search: tag.name},
		  headers: {
		    'User-Agent': 'request',
		    'Accept': '*/*'
		  }
		};
				Dream.create(anewdream, function(err, newdream) {
						Tag.findOne(tag, function(err, foundTag) {

							request.post(postOptions, function (err, response, body) {
								if(!err && res.statusCode == 200){

									var $ = cheerio.load(body);

									if ($('p','.definition')['0'].children[0].data){
										meaning = $('p','.definition')['0'].children[0].data;
									} else if ($('li','.definition')['0'].children[0].data){
										meaning = $('li','.definition')['0'].children[0].data;
									} else {
										meaning = "couldn't find a meaning :(";
									}		
								}
								tag.meaning = meaning;

								rp({
									uri: "http://api.giphy.com/v1/gifs/search?q="+tag.name+"&api_key=dc6zaTOxFJmzC",
									qs: {
											api_key: 'dc6zaTOxFJmzC'// -> uri + '?access_token=xxxxx%20xxxxx'
											},
									headers: {
									'User-Agent': 'Request-Promise'
									},
									json: true})
								.then(function(body) {
										if (body.data[0]){
											var imageUrl = body.data[0].images.original.url;
											tag.img = imageUrl;
										}

										if(!foundTag) {
											Tag.create(tag, function(err, newtag) {
												console.log("tag", newtag);
												console.log("tagname", newtag.name);
												console.log("tagmeaning", newtag.meaning, "end tag meaning");
												console.log("type of tag", typeof newtag);
												DreamTag.create({dreamId: newdream._id, tagId: newtag._id}, function(err, dreamtag) {
													res.send({newdream: newdream, tag: newtag});
												});
											});
										} else {
											DreamTag.create({dreamId: newdream._id, tagId: foundTag._id}, function(err, dreamtag) {
												res.send({newdream: newdream, tag: tag});
											});
										}
								});
							});	
						});
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
				console.log("sending back dreams", dreams);
				var dreamerIds = dreams.map(function(dream) {
					return dream.dreamerId;
					console.log('dreamerIds', dreamerIds);
				});
				Dreamer.find({_id: { $in: dreamerIds}}, function(err, dreamers) {
					console.log("found dreamers,", dreamers);
					res.send({dreams: dreams, dreamers: dreamers});
				});
		});
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
