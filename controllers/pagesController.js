//Controller for root and about us
var pagesController = {
    index: function(req, res) {
      req.currentUser(function(err, dreamer) {
        if (dreamer){
          res.redirect("/dreamers/"+dreamer._id+"/dreams");
        }else{
          res.render('pages/index', {currentUser: dreamer}); 
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
        res.render("pages/login", {currentUser: dreamer});
      }); 
    },
    logout: function(req,res){
        req.logout();
        res.redirect("/");
    }
};

module.exports = pagesController;
