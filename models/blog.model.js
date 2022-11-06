const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogSchema = new Schema({
  id: ObjectId,
  title: { type: String, required: true, unique: true },
  description: { type: String },
  author: { type: String },
  state: { type: String, enum: ["draft", "published"], default: "draft" },
  read_count: { type: Number },
  reading_time: { type: String },
  tags: { type: String },
  body: { type: String, required: true },
},
  { timestamps: true }
);

BlogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = { Blog };
