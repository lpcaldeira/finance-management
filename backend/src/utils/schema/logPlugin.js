const _ = require("lodash");
const mongoose = require("mongoose");
// const LogSchema = mongoose.model("Log");
const LogSchema = require("../../models/Log");
const { getDiff } = require("../diff");

module.exports = function plugin(schema) {
  schema.post("init", (doc) => {
    doc._original = doc.toObject({ transform: false });
  });
  schema.pre("save", function (next) {
    if (this.isNew) {
      next();
    } else {
      this._diff = getDiff(this, this._original);
      next();
    }
  });
  schema.pre("updateOne", function (next) {
    this._diff = getDiff(this, this._original);
    next();
  });
  // não finalizada a gravação do log
  schema.methods.log = function (data) {
    data.diff = {
      before: this._original,
      after: this._diff,
    };
    return LogSchema.create(data);
  };
};