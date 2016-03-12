var Dreamer = require('../models/Dreamer');

//INDEX
// function getAll(req, res){
// 	res.render('index');
// }
var dreamersController = {
	getAll: function(req, res) {
		res.send('200');
	}
};

module.exports = dreamersController;
