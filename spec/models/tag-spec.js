var mongoose = require('mongoose');
var tag = require('../../models/tag');

describe("tag model", function() {
  var tag;
  beforeEach(function(done) {
    mongoose.connect("mongodb://localhost/dream-logger");
    tag = new Tag({});
    tag.save;
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
  
})
