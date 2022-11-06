const { Blog } = require('../models/blog.model');
const { User } = require('../models/user.model')


// CREATE NEW BLOG
const createBlog = async (req, res, next) => {
  const body = req.body;
  const user = await User.findById(body.userId);

  const newBlog = await Blog.create({
    title: body.title,
    description: body.description,
    author: body.author,
    reading_time: body.reading_time,
    tags: body.tags,
    body: body.body,
    user: user._id
  });

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  

  return res.status(200).json({ status: true, savedBlog, user: req.user,
    token: req.query.secret_token });

};

// GET SINGLE BLOG
const getBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ status: false, blog: null });
  }

  blog.read_count++
  await blog.save();
  
  return res.json({ status: true, blog });
};


const getAllBlogs = async (req, res) => {
  const { query } = req;
  const { state = "published", page = 1, per_page = 20 } = query;

  const findQuery = {};

  if (state) {
    findQuery.state = state;
  }

  const allBlogs = await Blog
  .find(findQuery)
  .skip(page)
  .limit(per_page);


  return res.status(200).json({ status: true, allBlogs });
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ status: false, blog: null });
  }

  if (state < blog.state) {
    return res
      .status(422)
      .json({ status: false, blog: null, message: "Operation failed" });
  }

  blog.state = state;

  await blog.save();

  return res.json({ status: true, blog });
};

const deleteBlog = async (req, res) => {
  const { id } = req.params.id;
  const authorId = req.user._id

  const blog = await Blog.deleteOne({ _id: authorId });
  
  return res.json({ status: true, blog });
};

module.exports = {
  createBlog,
  getBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog
}