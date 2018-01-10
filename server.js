// pull in required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const passport = require('passport');
const expressSession = require('express-session');

// Express server
const server = express();
// Set dynamic porting for development
const PORT = process.env.PORT || 3000;
// Set middleware functions
server.use(express.static('./public'));
server.use(cookieParser());
server.use(bodyParser.text());
// Configure body parser for AJAX requests
server.use(bodyParser.json({type: 'application/vnd.api+json'}));
server.use(bodyParser.urlencoded({extended: true}));

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://heroku_03txzbn4:fop6686kd3qv63mir6c1rhjbq@ds245277.mlab.com:45277/heroku_03txzbn4",
  {
    useMongoClient: true
  }
);

// mongodb://localhost/mealsp


// Configuring Passport
//Middleware 
server.use(expressSession({secret: 'keyboard-cat', resave: true, saveUninitialized: true }));
server.use(passport.initialize());
server.use(passport.session());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

// Connect routes
require('./routes/html-routes.js')(server);
require('./routes/api-routes.js')(server);
// Start the API server
server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
