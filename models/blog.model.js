const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogSchema = new Schema({
  id: ObjectId,
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  state: { type: String, required: true, enum: ["draft", "published"], default: "draft" },
  read_count: { type: Number, required: true, default: 0 },
  reading_time: { type: String, required: true },
  tags: { type: String, required: true },
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
