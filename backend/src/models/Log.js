const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const LogSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    action: { type: String, required: true },
    category: { type: String, required: true },
    message: { type: String, required: true },
    diff: { type: Schema.Types.Mixed },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // createdAt: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

LogSchema.plugin(mongoosePaginate);
LogSchema.index({ action: 1, category: 1 });

module.exports = mongoose.model("Log", LogSchema);
