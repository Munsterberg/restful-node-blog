const Blog = require('../models/Blog');

module.exports = function(app) {
  
  /*
  * Index Route
  */
  app.get('/posts', function(req, res) {
    Blog.find({}, function(err, blogs) {
      if(err) {
        console.log(err);
      } else {
        res.render('index', {
          title: 'Home',
          blogs: blogs
        });
      }
    });
  });
  
  /*
  * New Blog Post Route
  */
  app.get('/posts/new', function(req, res) {
    res.render('new', { title: 'New Post' });
  });
  
  
  /*
  * Create Post Route
  */

};