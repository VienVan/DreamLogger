//Controller for root and about us
var pagesController = {
    index: function(req, res) {
      req.currentUser(function(err, dreamer) {
        res.render('pages/index', {currentUser: dreamer});
      })
    },
    about: function(req, res){
    	res.render('pages/about');
    },

    edit: function(req, res){
    	res.render('dreamers/edit');
    },
    login: function(req, res){
    	res.render("pages/login");
    }
};

module.exports = pagesController;
