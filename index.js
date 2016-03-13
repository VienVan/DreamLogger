//DEPENDENCIES
var express         = require('express'),
    app             = express(),
    morgan 			    = require('morgan'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    hbs             = require('hbs'),
    mongoose        = require('mongoose'),
    keygen          = require('keygenerator'),
    session         = require('express-session'),
    db              = require('./models'),
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
app.use(
  session({
    // use keygen to generate a secret key for us
    secret: keygen._({specials: true}),
    resave: false,
    saveUninitialized: true
  })
);
var Dreamer = require('./models/dreamer')
// extending the `req` object to help manage sessions
app.use(function (req, res, next) {
  // login a user
  req.login = function (dreamer) {
    req.session.userId = dreamer._id;
  };
  // find the current user
  req.currentUser = function (cb) {
    db.Dreamer.
      findOne({ _id: req.session.userId },
      function (err, dreamer) {
        req.dreamer = dreamer;
        cb(null, dreamer);
      })
  };
  // logout the current user
  req.logout = function () {
    req.session.userId = null;
    req.dreamer = null;
  }
  // call the next middleware in the stack
  next();
});

// where the user submits the sign-up form
app.post("/dreamers", function signup(req, res) {
  // grab the user from the params
  var dreamer = req.body.dreamer;
  // pull out their email & password
  var username = dreamer.username;
  var password = dreamer.password;
  // create the new dreamer
  db.User.createSecure(username, password, function(err, dreamer) {
    req.login(dreamer);
    res.redirect("/");
  });
});

// where the user submits the login form
app.post("/", function login(req, res) {
  var dreamer = req.body.dreamer;
  var username = dreamer.username;
  var password = dreamer.password;
  db.User.authenticate(username, password, function (err, dreamer) {
    // login the dreamer
    req.login(dreamer);
    // redirect to user profile
    res.redirect("/");
  });
});

// show the current user
// app.get("/dreamers/:id/edit", function userShow(req, res) {
//   req.currentUser(function (err, currentUser) {
//     if (currentUser === null) {
//       res.redirect("/")
//     } else {
//       id =
//       res.render("/dreamers/"+id+"/edit", {user: currentUser});
//     }
//   })
// });

//Start Server
app.listen(port, function() {
  console.log("Listening on port:", port);
});
