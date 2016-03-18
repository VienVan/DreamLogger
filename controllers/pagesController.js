var Dream 							= require('../models').Dream;
var Dreamer 						= require('../models').Dreamer;
var Tag 								= require('../models/tag');
var DreamTag 						= require('../models').DreamTag;

//Controller for root and about us
var pagesController = {
    index: function(req, res) {
      req.currentUser(function(err, dreamer) {
        // get error messages here
        console.log(req.flash)
        if (dreamer){
          res.redirect("/dreamers/"+dreamer._id+"/dreams");
        }else{
          res.render('pages/index', {currentUser: dreamer, messages: 'test'});
        }
      });
    },
    about: function(req, res){
      req.currentUser(function(err, dreamer) {
        res.render('pages/about', {currentUser: dreamer});
      });
    },
    edit: function(req, res){
      req.currentUser(function(err, dreamer) {
        res.render('dreamers/edit', {currentUser: dreamer});
      });
    },
    login: function(req, res){
      req.currentUser(function(err, dreamer) {
        res.render("pages/login", {currentUser: dreamer, messages: {success: 'yay'}});
      });
    },
    logout: function(req, res){
        req.logout();
        res.redirect("/");
    },
    search: function(req, res) {
        var search = req.params.search;
        Tag.dreams('search', function(err, dreams) {
          res.render('/pages/meaning', {dreams: dreams})
        });
    }
};

module.exports = pagesController;
