//DEPENDENCIES
var express         = require('express'),
    logger			    = require('morgan'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    hbs             = require('hbs'),
    mongoose        = require('mongoose'),
    session					= require('express-session'),
    keygen 					= require('keygenerator'),
    app             = express(),    
    port            = 3000;

//Database
mongoose.connect('mongodb://localhost/dream-logger');
process.on('exit', function() {mongoose.disconnect();
});

//MIDDLEWARES
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//View Engine
app.set('view engine', 'hbs');
app.set('views', './views');
hbs.registerPartials(__dirname + '/views/partials');

////////////////////////////////////////////////////// Session Stuff :( :( :(

// create our session
app.use(
  session({
    // use keygen to generate a secret key for us
    secret: keygen._({specials: true}),
    resave: false,
    saveUninitialized: true
  })
);

// extending the `req` object to help manage sessions
app.use(function (req, res, next) {
  // login a user
  req.login = function (dreamer) {
    req.session.userId = dreamer._id;
  };
  // find the current user
  req.currentUser = function (cb) {
    Dreamer.
      findOne({ _id: req.session.userId },
      function (err, dreamer) {
        req.dreamer = dreamer;
        cb(null, dreamer);
      });
  };
  // logout the current user
  req.logout = function () {
    req.session.userId = null;
    req.dreamer = null;
  };
  // call the next middleware in the stack
  next(); 
});

// signup route
// app.get("/signup", function (req, res) {
//   res.sendFile(path.join(views, "signup.html"));
// });

// where the user submits the sign-up form
// app.post(["/dreamers", "/"], function signup(req, res) {
//   // grab the user from the params
//   var dreamer = req.body.dreamer;
//   // pull out their email & password
//   var username = dreamer.username;
//   var password = dreamer.password;
//   // create the new user
//   Dreamer.createSecure(username, password, function(err, dreamer) {
//     req.login(dreamer);
//     res.redirect("/pages/about"); 
//   });
// });

// where the user submits the login form
// app.post(["/sessions", "/login"], function login(req, res) {
//   var dreamer = req.body.dreamer;
//   var username = dreamer.username;
//   var password = dreamer.password;
//   Dreamer.authenticate(username, password, function (err, dreamer) {
//     // login the user
//     req.login(dreamer);
//     // redirect to user profile
//     res.redirect("/pages/about"); 
//   });
// });

// show the current user
// app.get("/profile", function userShow(req, res) {
//   req.currentUser(function (err, dreamer) {
//     if (dreamer === null) {
//       res.redirect("/pages/about");
//     } else {
//       res.send("Hello " + dreamer.username);
//     }
//   });
// });

//////////////////////////////////////////////////////

//Routes
var routes = require('./config/routes');
app.use(routes);

//Start Server
app.listen(port, function() {
  console.log("Listening on port:", port);
});
