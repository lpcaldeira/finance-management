const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const TaxSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    price: { type: Number, required: true },
    paid: { type: Boolean, default: false },
    referenceDate: { type: Date, required: true }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

TaxSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Tax", TaxSchema);
