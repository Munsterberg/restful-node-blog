const Blog = require('../models/Blog');

module.exports = function(app) {
  
  /*
  * GET INDEX ROUTE
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
  * GET CREATE POST ROUTE
  */
  app.get('/posts/new', function(req, res) {
    res.render('new', { title: 'New Post' });
  });
  
  
  /*
  * POST CREATE ROUTE
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
    });
  });
  
  /*
  * GET SHOW ROUTE
  */
  app.get('/posts/:id', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
      if(err) {
        console.log(err);
      } else {
        res.render('show', {
          title: 'Blog',
          blog: foundBlog
        });
      }
    });
  });
  
  /*
  * GET EDIT POST ROUTE
  */
  app.get('/posts/:id/edit', function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
      if(err) {
        console.log(err);
      } else {
        res.render('edit', {
          title: 'Edit',
          blog: foundBlog
        });
      }
    });
  });
  
  /*
  * PUT EDIT ROUTE
  */
  app.put('/posts/:id', function(req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/posts/' + req.params.id);
      }
    });
  });
  
  /*
  * DELETE POST ROUTE
  */
  app.delete('/posts/:id', function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/posts');
      }
    });
  });

};