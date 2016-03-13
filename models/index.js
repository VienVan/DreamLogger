var mongoose = require('mongoose');
mongoose.createConnection("mongodb://localhost/dream-logger");
module.exports.Dreamer = require('./dreamer');
