const readTimeEstimate = require("read-time-estimate");

const { Blog } = require("../models/blog.model");
const User = require("../models/user.model");

// CREATE NEW BLOG
const createBlog = async (req, res, next) => {
  try {
    const body = req.body;

    // const user = await User.findById(req.user._id);

    const text = body;
    const wpm = 265;
    const words = text.toString().trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    const readingtime = `${time} min`;

    const newBlog = await Blog.create({
      title: body.title,
      description: body.description,
      author: body.author,
      reading_time: readingtime,
      tags: body.tags,
      body: body.body,
      // user: user._id,
      // user: req.user._id
    });

    return res.status(201).json({
      status: "true",
      message: "Blog Created",
      blog: { ...newBlog._doc },
      // token: req.query.secret_token,
    });
  } catch (err) {
    next(err);
  }
};

// GET SINGLE BLOG
const getBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).json({ status: false, blog: null });
  }

  blog.read_count++;
  await blog.save();

  return res.json({ status: true, blog });
};

const getAllBlogs = async (req, res) => {
  const {
    author,
    title,
    tags,
    state,
    // state = "published",
    sort = 'createdAt'
  } = req.query;

  const findQuery = {};

  if (author) {
    findQuery.author = { $regex: author, $options: "i" };
  }
  if (title) {
    findQuery.title = { $regex: title, $options: "i" };
  }
  if (tags) {
    findQuery.tags = { $regex: tags, $options: "i" };
  }
  if (state) {
    findQuery.state = state;
  }
  let result = Blog.find(findQuery)
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList)
} else {
    result = result.sort('createdAt')
}

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    const skip = (page -1) * limit;

    result = result.skip(skip).limit(limit)

  const allBlogs = await result
  return res.status(200).json({ status: true, allBlogs, ndHits: allBlogs.length });
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
  const authorId = req.user._id;

  const blog = await Blog.deleteOne({ _id: authorId });

  return res.json({ status: true, blog });
};

module.exports = {
  createBlog,
  getBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
