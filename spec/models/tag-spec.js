var mongoose = require('mongoose');
var Tag = require('../../models/tag');

describe("tag model", function() {
  var tag;
  beforeEach(function(done) {
    mongoose.createConnection("mongodb://localhost:3000/dream-logger");
    tag = new Tag({});
    tag.save();
    done();
  })

  afterEach(function(done) {
    mongoose.disconnect();
    done();
  })

  it('must have a tag name', function() {
    tag.name = "Vien";
    expect(tag.name).toBeDefined();
  })

  it('tag name must lower-case', function() {
    tag.name = "Vien";
    expect(tag.name).toBe(tag.name.toLowerCase());
  })

  it('tags must have an image', function(){
    expect(tag.img).toBeDefined();
  })

});
