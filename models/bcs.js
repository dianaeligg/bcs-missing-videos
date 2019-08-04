const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcsSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now }
});

const bcs = mongoose.model("bcs", bcsSchema);

module.exports = bcs;
