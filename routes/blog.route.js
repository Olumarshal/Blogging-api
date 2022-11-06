const express = require('express')
const passport = require('passport');
const  BlogController  = require('../controllers/blog.controller');

const blogRouter = express.Router();

blogRouter.post('/', passport.authenticate('jwt', { session: false  }), BlogController.createBlog)

blogRouter.get('/:id', BlogController.getBlog)

blogRouter.get('/', BlogController.getAllBlogs)

blogRouter.patch('/:id', passport.authenticate('jwt', { session: false  }), BlogController.updateBlog)

blogRouter.delete('/:id', BlogController.deleteBlog)


module.exports = blogRouter;