const express = require('express')
const passport = require('passport');
const  BlogController  = require('../controllers/blog.controller');
require("../authentication/auth")

const blogRouter = express.Router();

blogRouter.post('/', passport.authenticate('jwt', { session: false  }), BlogController.createBlog)

blogRouter.get('/:id', BlogController.getBlog)

blogRouter.get('/', BlogController.getAllBlogs)

blogRouter.patch('/:id', passport.authenticate('jwt', { session: false  }), BlogController.updateBlog)

blogRouter.delete('/:id', passport.authenticate('jwt', { session: false  }), BlogController.deleteBlog)


module.exports = blogRouter;