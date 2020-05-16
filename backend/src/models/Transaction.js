const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    price: { type: Number, required: true, default: 0 },
    purchasePrice: { type: Number, required: true, default: 0 },
    salePrice: { type: Number, required: true, default: 0 },
    quantity: { type: Number, required: true, default: 1},
    type: { type: Number, default: false, default: 0 } // 0 - saida | 1 - entrada
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

TransactionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Transaction", TransactionSchema);
