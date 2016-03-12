var mongoose = require('mongoose');
var Dreamer = require("../models/dreamer");
mongoose.connect('mongodb://localhost/dream-logger');

//clears all database entries.
Dreamer.remove({}, function(err) {
 if (err) {
   console.log("ERROR:", err);
 }
});

var dreamers = [
 {username: "vien", password_digest: "1234", img: "https://www.placeholder.com", location: "San Francisco"},
 {username: "dan", password_digest: "4321", img: "https://www.placeholder.com", location: "San Francisco"}
 ]

Dreamer.create(dreamers, function(err, docs) {
 if (err) {
   console.log("ERROR:", err);
 } else {
   console.log("Created:", docs);
   mongoose.connection.close();
 }
});
