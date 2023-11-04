const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date_added: { type: Date, Default: Date.now },
  comment: { type: String, required: true, maxLength: 300 },
});

CommentSchema.virtual("url").get(function () {
  return `/comments/${this._id}`;
});
CommentSchema.virtual("date_added_formatted").get(function () {
  return DateTime.fromJSDate(this.date_added).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Comment", CommentSchema);
