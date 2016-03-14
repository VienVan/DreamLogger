var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// dreams Schema
var dreamSchema = new Schema({
    description: String,
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
});

var dreamerSchema = new Schema({
	username: {type: String, required: true, unique: true},
	password_digest: {type: String, required: true},
	img: {type: String},
	location: String,
	dreams: [dreamSchema],
}, {timestamps: true});

module.exports.Dreamer = mongoose.model('Dreamer', dreamerSchema);
module.exports.Dream = mongoose.model('Dream', dreamSchema);
