var mongoose = require('mongoose');
var Dreamer = require('../../models').Dreamer;

describe('A User: Model', function() {
  var dreamer;
  beforeEach(function(done) {
    mongoose.createConnection("mongodb://localhost:3000/dream-logger");
    dreamer = new Dreamer({username: "Vien"});
    dreamer.save();
    done();
  })
  afterEach(function(done) {
    Dreamer.remove({});
    mongoose.disconnect();
    done();
  })

  it('user must have a username', function() {
    expect(dreamer.username).toBeDefined();
  })

  it('user should only have one username', function() {
    var dreamer2 = new Dreamer({username: "Vien"})
    expect(dreamer2.save()).toThrowError;
  })

  it('user must have a password', function() {
    expect(new Dreamer({username: "Vien"})).toThrowError;
  })

  it('dreams have tag(s)', function() {
    dreamer.dreams.tags = {name: "cats"};
    expect(dreamer.dreams.tags).toBeDefined();
  })

  it('dreams have a description', function() {
    dreamer.dreams.description = "I was on a boat"
    expect(dreamer.dreams.description).toBeDefined();
  })

})
