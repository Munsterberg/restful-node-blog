// Example schema usage
// var Example = require('../models/Schema');
const Blog = require('../models/Blog');

module.exports = function(app) {
  
  app.get('/', function(req, res) {    
    res.redirect('/posts');
  });
  
};