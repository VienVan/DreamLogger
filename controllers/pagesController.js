//Controller for root and about us
var pagesController = {
    index: function(req, res) {
      res.render('pages/index');
    },
    about: function(req, res){
    	res.render('pages/about');
    }
};

module.exports = pagesController;
