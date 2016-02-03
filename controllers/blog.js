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
  app.post('/posts', function(req, res) { 
    const blog = new Blog({
      title: req.body.blog.title,
      image: req.body.blog.image,
      body: req.body.blog.body
    });
    
    blog.save(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/posts');
      }
    })
  });

};