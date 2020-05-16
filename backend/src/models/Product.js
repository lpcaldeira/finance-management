const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    salePrice: { type: Number, required: true, default: 0 },
    // se o sistema for crescer, tem que criar um model só pra gestão de arquivos
    productImage: { type: Schema.Types.Mixed, required: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", ProductSchema);
