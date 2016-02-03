// Module Dependencies
// ===========================
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const logger = require('morgan');
const flash = require('express-flash');
const mongoose = require('mongoose');
const sass = require('node-sass-middleware');
const expressValidator = require('express-validator');
const favicon = require('serve-favicon');
const connectAssets = require('connect-assets');
const methodOverride = require('method-override');
const lusca = require('lusca');
const path = require('path');


// Controllers
// ===========================
const homeController = require('./controllers/home');
const blogController = require('./controllers/blog');

// API keys, Passport info, and Secrets
// ===========================
const secrets = require('./config/secrets');


// Create Express App
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog-project');
mongoose.connection.on('error', function() {
  console.error('MongoDB connection error. Please make sure MongoDB is running.');
});

// Express Config / Middleware
// ===========================
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(connectAssets({
  paths: [path.join(__dirname, 'public/css'), path.join(__dirname, 'public/js')]
}));
app.use(logger('dev'));
// Uncomment once you add Favicon 
// app.use(favicon(path.join(__dirname, 'public/favicon.png'))); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secrets.sessionSecret
}));
app.use(flash());
app.use(lusca({
  csrf: true,
  xframe: 'SAMEORIGIN',
  xssProtection: true
}));
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  outputStyle: 'compressed',
  // Uncomment for SASS support, otherwise leave alone for SCSS
  // indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


// Call App routes
// ===========================
homeController(app);
blogController(app);


// Error Handler
app.use(errorHandler());

// Start Express Server
app.listen(3000, function() {
  console.log('Server is running on port 3000!');
});

module.exports = app;