var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var tagSchema = new Schema({
  name: {type: String, required: true, lowercase: true, trim: true},
  img: {type: String, default: "https://images.unsplash.com/photo-1447280714070-3280cb09be9b?crop=entropy&dpr=2&fit=crop&fm=jpg&h=725&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1300"},
  meaning: String
});

var Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
