var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dreamerSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password_digest: {type: String, required: true},
  img: {type: String},
  location: String,
  // dreams: {
  //   tags: {embed},
  //   description: String
  // },
}, {timestamps: true});

var Dreamer = mongoose.model('Dreamer', dreamerSchema);
module.exports = Dreamer;
