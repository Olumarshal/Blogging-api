const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogSchema = new Schema({
  id: ObjectId,
  title: { type: String, required: true, unique: true },
  description: { type: String },
  author: { type: String },
  state: { type: String, enum: ["draft", "published"], default: "draft" },
  read_count: { type: Number, default: 0 },
  reading_time: { type: String },
  tags: { type: String },
  body: { type: String, required: true },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = { Blog };
