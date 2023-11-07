const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  date_created: { type: Date, default: Date.now },
  user_name: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, minLength: 8 },
  status: {
    type: String,
    required: true,
    enum: ["WannaBe", "Member", "VIP"],
    default: "WannaBe",
  },
  admin: { type: Boolean, default: false },
});

UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

UserSchema.virtual("date_created_formatted").get(function () {
  return DateTime.fromJSDate(this.date_created).toLocaleString(
    DateTime.DATE_MED
  );
});
UserSchema.virtual("full_name").get(function () {
  return this.first_name + " " + this.last_name;
});

module.exports = mongoose.model("User", UserSchema);
