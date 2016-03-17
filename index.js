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
    db              = require('./models'),
    hbsutils = require('hbs-utils')(hbs),
    port            = 3000,
    http            = require('http'),
    https           = require('https');

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
hbsutils.registerWatchedPartials(__dirname + '/views/partials'); // partial changes will restart nodemon

////////////////////////////////////////////////////// Session Stuff :( :( :(
//GIPHY
exports.getJSON = function(options, onResult)
{
    console.log("rest::getJSON");

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};
var options = {
    host: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=american+psycho',
    port: port,
    path: '/v1/gifs/random',
    method: 'GET',
    data: "data"
};
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
    db.Dreamer.
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
