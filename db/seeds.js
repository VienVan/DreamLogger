var mongoose = require('mongoose');
var Dreamer = require("../models").Dreamer;
var Tag = require('../models/tag');
var Dream = require('../models').Dream;
var DreamTag = require('../models').DreamTag;
mongoose.connect('mongodb://localhost/dream-logger');

Dream.remove({});
Dreamer.remove({});
Tag.remove({});
DreamTag.remove({});

var dreamer = {
	username: "Vien",
	password_digest: "1234"
};

// create data 
Dreamer.create(dreamer, function (err, dreamer) {
	console.log("created dreamer:", dreamer);
	var dreams = [
		{
			description: "I dream of Beyonce",
			dreamerId: dreamer._id
		},
		{
			description: "I dream of blueberries",
			dreamerId: dreamer._id
		}
	];
	// create dreams 
	Dream.create(dreams,function(err, dreams) {
		console.log("created dreams:", dreams);
		var tags = [
			{name: "Jay-z"},
			{name: "muffins"}
		];
		// create tags
		Tag.create(tags, function(err, tags) {
			console.log("created tags:", tags);
			var dream1 = dreams[0];
			var dream2 = dreams[1];
			var tag1 = tags[0];
			var tag2 = tags[1];
			// associate tags with dreams
			var dreamTags = [
				{
					dreamId: dream1._id,
					tagId: tag1._id
				},
				{
					dreamId: dream2._id,
					tagId: tag2._id
				},
				{
					dreamId: dream1._id,
					tagId: tag2._id
				}
			];
			DreamTag.create(dreamTags, function (err, dreamTags) {
				console.log("m2m association made!", dreamTags);
				// disconnect from the database
				mongoose.disconnect();
			});
		});
	});
});



// //clears all database entries.
// Dreamer.remove({}, function(err) {
//  if (err) {
//    console.log("ERROR:", err);
//  }
// });

// var dreamers = [
//  {username: "vien", password_digest: "1234", img: "https://static.pexels.com/photos/26184/pexels-photo-26184-medium.jpg", location: "San Francisco", dreams: []},
//  {username: "dan", password_digest: "4321", img: "https://static.pexels.com/photos/57866/pexels-photo-57866-medium.jpeg", location: "San Francisco"}
//  ];

// // var dreams = [
// // {
// // 	description: "I was dreaming about cotton candy and clouds."
// // }
// // ];

// dreamers[0].dreams.push({description: "I was dreaming about cotton candy and clouds."});

// var tags = [
// {
// 	name: "cotton candy"
// }];


// // Tag.create(tags, function(err, tag) {
// // 	console.log(tag);
// // });

// Dreamer.create(dreamers, function(err, docs) {
//  if (err) {
//    console.log("ERROR:", err);
//  } else {
//    console.log("Created:", docs);
//    mongoose.connection.close();
//  }
// });


// // DreamTag.create({dreamId: dreams[0]._id, tagId: tags[0]._id});
