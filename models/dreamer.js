var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var dreamerSchema = new Schema({
  username: {type: String, required: true, unique: true, trim: true},
  password: {type: String, required: true},
  img: {type: String},
  location: String,
  // dreams: {
  //   tags: {embed},
  //   description: String
  // },
}, {timestamps: true});


// // create a new dreamer with secure (hashed) password (for sign up)
// dreamerSchema.statics.createSecure = function (username, password, cb) {
//   // `_this` now references our schema
//   var _this = this;
//   // generate some salt & hash the password
//   bcrypt.hash(password, 10, function (err, hash) {
//     // build the dreamer object
//     var dreamer = {
//       username: username,
//       password_digest: hash,
//       createdAt: Date.now()
//     };
//     // create a new dreamer in the db with hashed password and execute the callback when done
//     _this.create(dreamer, cb);
//   });
// };
//
// // authenticate dreamer (for login)
// dreamerSchema.statics.authenticate = function (username, password, cb) {
//   // find dreamer by username entered at log in
//   this.findOne({username: username}, function (err, dreamer) {
//     // throw error if can't find dreamer
//     if (dreamer === null) {
//       cb("Can\'t find dreamer with that username", null);
//     // if found dreamer, check if password is correct
//   } else if (dreamer.checkPassword(password)) {
//       // the dreamer is found & password is correct, so execute callback
//       // pass no error, just the dreamer to the callback
//       cb(null, dreamer);
//     } else {
//       // dreamer found, but password incorrect
//       cb("password incorrect", dreamer)
//     }
//   });
// };
//
// // compare password user enters with hashed password (`passwordDigest`)
// dreamerSchema.methods.checkPassword = function (password) {
//   // run hashing algorithm (with salt) on password to compare with stored `passwordDigest`
//   // `compareSync` is like `compare` but synchronous
//   // returns true or false
//   return bcrypt.compareSync(password, this.password_digest);
// };



var Dreamer = mongoose.model('Dreamer', dreamerSchema);
module.exports = Dreamer;
