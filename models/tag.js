var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DreamTag = require("./index").DreamTag
var Dream = require("./index").Dream

var tagSchema = new Schema({
  name: {type: String, required: true, lowercase: true, trim: true},
  img: {type: String, default: "https://images.unsplash.com/photo-1447280714070-3280cb09be9b?crop=entropy&dpr=2&fit=crop&fm=jpg&h=725&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1300"},
  meaning: String
});

tagSchema.statics.dreams = function(name, cb) {
  this.findOne({name: name}, function(err, tag) {
    DreamTag.find({tagId: tag._id}, function(err, dreamtags) {
      dreamIds = dreamtags.map(function(dreamtag) {
        return dreamtag.dreamId;
      })
      Dream.find({_id: { $in: dreamIds}}, function(err, dreams){
       cb(dreams);
      });
    });
  });
}

var Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;
