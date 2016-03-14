var mongoose = require('mongoose');
var Dreamer = require("../models").Dreamer;
mongoose.connect('mongodb://localhost/dream-logger');

//clears all database entries.
Dreamer.remove({}, function(err) {
 if (err) {
   console.log("ERROR:", err);
 }
});

var dreamers = [
 {username: "vien", password_digest: "1234", img: "https://static.pexels.com/photos/26184/pexels-photo-26184-medium.jpg", location: "San Francisco"},
 {username: "dan", password_digest: "4321", img: "https://static.pexels.com/photos/57866/pexels-photo-57866-medium.jpeg", location: "San Francisco"}
 ]

Dreamer.create(dreamers, function(err, docs) {
 if (err) {
   console.log("ERROR:", err);
 } else {
   console.log("Created:", docs);
   mongoose.connection.close();
 }
});
