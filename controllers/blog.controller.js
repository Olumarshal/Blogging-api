const { Blog } = require('../models/blog.model');

// CREATE NEW BLOG
const createBlog = async (req, res, next) => {
  const body = req.body;
  const newBlog = await Blog.create({
    title: body.title,
    description: body.description,
    author: body.author,
    reading_time: body.reading_time,
    tags: body.tags,
    body: body.body,
  });

  return res.json({ status: true, newBlog, user: req.user,
    token: req.query.secret_token });

};

// GET SINGLE BLOG
const getBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ status: false, blog: null });
  }

  return res.json({ status: true, blog });
};


const getAllBlogs = async (req, res) => {
  const { query } = req;
  const { author, title, tags, page = 1, per_page = 20 } = query;

  // const findQuery = {};

  // if (created_at) {
  //     findQuery.created_at = {
  //         $gt: moment(created_at).startOf('day').toDate(),
  //         $lt: moment(created_at).endOf('day').toDate(),
  //     }
  // }

  // if (state) {
  //     findQuery.state = state;
  // }

  // const sortQuery = {};

  // const sortAttributes = order_by.split(',')

  // for (const attribute of sortAttributes) {
  //     if (order === 'asc' && order_by) {
  //         sortQuery[attribute] = 1
  //     }

  //     if (order === 'desc' && order_by) {
  //         sortQuery[attribute] = -1
  //     }
  // }

  const allBlogs = await Blog
  .find()
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
  const { id } = req.params;

  const blog = await Blog.deleteOne({ _id: id });
  
  return res.json({ status: true, blog });
};

module.exports = {
  createBlog,
  getBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog
}