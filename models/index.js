var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// dreams Schema
var dreamSchema = new Schema({
    description: String,
    dreamerId: {type: Schema.Types.ObjectId, ref: 'Dreamer'}
    // tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
}, {timestamps: true});

var dreamerSchema = new Schema({
	username: {type: String, required: true, unique: true},
	password_digest: {type: String, required: true},
	img: {type: String},
  // dreams: [dreamId: {type: Schema.Types.ObjectId, ref: 'Dream'}],
	location: String
}, {timestamps: true});

var dreamtagSchema = new Schema ({
  dreamId: [{type: Schema.Types.ObjectId, ref: 'Dream'}],
  tagId: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
});

// create a new user with secure (hashed) password (for sign up)
dreamerSchema.statics.createSecure = function (username, password, cb) {
  // `_this` now references our schema
  var _this = this;
  // generate some salt
  bcrypt.genSalt(12, function (err, salt) {
    // hash the password with the salt
    bcrypt.hash(password, salt, function (err, hash) {
      // build the user object
      var user = {
        username: username,
        password_digest: hash
      };
      // create a new user in the db with hashed password and execute the callback when done
      _this.create(user, cb);
    });
  });
};

// authenticate user (for login)
dreamerSchema.statics.authenticate = function (username, password, cb) {
  // find user by username entered at log in
  this.findOne({username: username}, function (err, dreamer) {
    // throw error if can't find user
    if (dreamer === null) {
      cb("Can\'t find user with that username", null);
    // if found user, check if password is correct
    } else if (dreamer.checkPassword(password)) {
      // the user is found & password is correct, so execute callback
      // pass no error, just the user to the callback
      cb(null, dreamer);
    } else {
      // user found, but password incorrect
      cb("password incorrect", dreamer);
    }
  });
};

// compare password user enters with hashed password (`passwordDigest`)
dreamerSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password to compare with stored `passwordDigest`
  // `compareSync` is like `compare` but synchronous
  // returns true or false
  return bcrypt.compareSync(password, this.password_digest);
};


module.exports.Dreamer = mongoose.model('Dreamer', dreamerSchema);
module.exports.Dream = mongoose.model('Dream', dreamSchema);
module.exports.DreamTag = mongoose.model('DreamTag', dreamtagSchema);
