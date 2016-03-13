//DEPENDENCIES
var express         = require('express'),
    app             = express(),
    morgan 			    = require('morgan'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    hbs             = require('hbs'),
    mongoose        = require('mongoose'),
    keygen          = require('keygenerator'),
    // session         = require('express-session'),
    // dreamer            = require('./models/dreamer'),
    port            = 3000;

//MIDDLEWARES
app.set('views', './views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//Database
mongoose.connect('mongodb://localhost/dream-logger');
process.on('exit', function() {mongoose.disconnect()});

//Routes
var routes = require('./config/routes');
app.use(routes);

//create sessions
// app.use(
//   session({
//     // use keygen to generate a secret key for us
//     secret: keygen._({specials: true}),
//     resave: false,
//     saveUninitialized: true
//   })
// );

// extending the `req` object to help manage sessions
// var sessions = require('./controllers/sessionsController');
// app.use(sessions.create);


//Start Server
app.listen(port, function() {
  console.log("Listening on port:", port);
});
