//DEPENDENCIES
var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    hbs             = require('hbs'),
    mongoose        = require('mongoose'),
    port            = 3000;

//MIDDLEWARES
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//Database
mongoose.connect('mongodb://localhost/dream-logger');
process.on('exit', function() {mongoose.disconnect()});

//Routes
var routes = require('./config/routes');

//Start Server
app.listen(port, function() {
  console.log("Listening on port:", port);
});
