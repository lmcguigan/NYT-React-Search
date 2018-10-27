const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  link: String,
  date: { type: Date, default: Date.now },
  notes: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the note model
      ref: "Note"
    }
  ]
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
