// pull in required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const passport = require('passport');
const expressSession = require('express-session');

// Express server
const app = express();
// Set dynamic porting for development
const PORT = process.env.PORT || 3000;
// Set middleware functions
app.use(express.static('./public'));
app.use(cookieParser());
app.use(bodyParser.text());
// Configure body parser for AJAX requests
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mealsp",
  {
    useMongoClient: true
  }
);
// Configuring Passport
//Middleware 
app.use(expressSession({secret: 'keyboard-cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

// Connect routes
require('./routes/html-routes.js')(server);
require('./routes/api-routes.js')(server);
// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
