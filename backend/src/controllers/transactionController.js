const _ = require("lodash");
const mongoose = require("mongoose");
const TransactionSchema = mongoose.model("Transaction");
const ProductSchema = mongoose.model("Product");
const { getDiff } = require("../utils/diff");

module.exports = {
  async find(req, res, next) {
    const { page = 1 } = req.query;
    await TransactionSchema.paginate({}, { page, limit: 10 })
      .then(async (result) => {
        let { docs, ...response } = result;

        const promises = docs.map((doc) => {
          if (doc.product) {
            return ProductSchema.findById(doc.product)
              .select("_id title productImage")
              .exec()
              .then((product) => {
                return {
                  _id: doc._id,
                  quantity: doc.quantity,
                  product: {
                    _id: doc.product,
                    title: product ? product.title : "Produto não encontrado",
                    productImage: product.productImage,
                    request: {
                      type: "GET",
                      url: "http://localhost:3001/api/products/" + doc.product,
                    },
                  },
                  price: doc.price,
                  purchasePrice: doc.purchasePrice,
                  salePrice: doc.salePrice,
                  type: doc.type,
                  createdAt: doc.createdAt,
                  updatedAt: doc.updatedAt,
                  request: {
                    type: "GET",
                    url: "http://localhost:3001/api/transactions/" + doc._id,
                  },
                };
              })
              .catch((err) => {
                return {
                  _id: doc._id,
                  quantity: doc.quantity,
                  product: {
                    _id: doc.product,
                    title: "Produto não encontrado",
                    request: {
                      type: "GET",
                      url: "http://localhost:3001/api/products/" + doc.product,
                    },
                  },
                  price: doc.price,
                  purchasePrice: doc.purchasePrice,
                  salePrice: doc.salePrice,
                  type: doc.type,
                  createdAt: doc.createdAt,
                  updatedAt: doc.updatedAt,
                  request: {
                    type: "GET",
                    url: "http://localhost:3001/api/transactions/" + doc._id,
                  },
                };
              });
          } else {
            return {
              _id: doc._id,
              quantity: doc.quantity,
              price: doc.price,
              purchasePrice: doc.purchasePrice,
              salePrice: doc.salePrice,
              type: doc.type,
              createdAt: doc.createdAt,
              updatedAt: doc.updatedAt,
              request: {
                type: "GET",
                url: "http://localhost:3001/api/transactions/" + doc._id,
              },
            };
          }
        });

        await Promise.all(promises).then((results) => {
          response.docs = results;
        });

        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({
          result: false,
          message:
            "Ocorreu algum problema na busca das Ordens. Tente novamente ou contate o nosso suporte.",
        });
      });
  },

  async findById(req, res, next) {
    TransactionSchema.findById(req.params.id)
      .populate(
        "product",
        "_id title description price salePrice productImage createdAt updatedAt"
      )
      .select("_id quantity product price purchasePrice salePrice type createdAt updatedAt")
      .exec()
      .then(async (result) => {
        console.log(result);
        if (result) {
          res.status(200).json({
            result: true,
            // message: "Transação adicionada com sucesso!",
            TransactionObject: {
              _id: result._id,
              quantity: result.quantity,
              product: result.product,
              price: result.price,
              purchasePrice: result.purchasePrice,
              salePrice: result.salePrice,
              type: result.type,
              createdAt: result.createdAt,
              updatedAt: result.updatedAt,
              request: {
                type: "GET",
                url: "http://localhost:3001/api/transactions/" + result._id,
              },
            },
          });
        } else {
          res.status(404).json({
            result: false,
            message:
              "Nenhuma Transação encontrada com este código. Tente novamente ou contate o nosso suporte.",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          result: false,
          message: "Código de Transação inválido.",
        });
      });
  },

  async create(req, res, next) {
    const Transaction = new TransactionSchema({
      _id: new mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.product,
      price: req.body.price,
      purchasePrice: req.body.purchasePrice,
      salePrice: req.body.salePrice,
      type: req.body.type,
    });

    Transaction.save()
      .then((transaction) => {
        TransactionSchema.findById(transaction._id)
          .populate(
            "product",
            "_id title description price salePrice productImage createdAt updatedAt"
          )
          .select(
            "_id quantity product price purchasePrice salePrice type createdAt updatedAt"
          )
          .exec()
          .then((transactionProduct) => {
            console.log(transactionProduct);
            res.status(201).json({
              result: true,
              message: "Transação adicionada com sucesso!",
              TransactionObject: transactionProduct,
              request: {
                type: "GET",
                url:
                  "http://localhost:3001/api/transactions/" +
                  transactionProduct._id,
              },
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          result: false,
          message:
            "Não foi possível adicionar sua Transação. Tente novamente ou contate o nosso suporte.",
        });
      });
  },

  async update(req, res, next) {
    const id = req.params.id;
    // usar o getDiff para mudar apenas as propriedades que forem diferentes
    // não validei o envio de um campo que não exista no modelo
    TransactionSchema.findById(id)
      .exec()
      .then((result) => {
        if (result) {
          const updateOps = getDiff(req.body, result);
          TransactionSchema.updateOne(
            { _id: id },
            {
              $set: updateOps,
            }
          )
            .exec()
            .then((result) => {
              if (result.nModified > 0) {
                res.status(200).json({
                  result: true,
                  message: "Transação atualizada com sucesso!",
                  request: {
                    type: "GET",
                    url: "http://localhost:3001/api/transactions/" + id,
                  },
                });
              } else {
                res.status(404).json({
                  result: false,
                  message:
                    "Nenhuma Transação encontrada com este código. Tente novamente ou contate o nosso suporte.",
                });
              }
            })
            .catch((err) => {
              res.status(500).json({
                result: false,
                message: "Código de Transação inválido.",
              });
            });
        } else {
          res.status(404).json({
            result: false,
            message:
              "Nenhuma Transação encontrada com este código. Tente novamente ou contate o nosso suporte.",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          result: false,
          message: "Código de Transação inválido.",
        });
      });
  },

  async delete(req, res, next) {
    TransactionSchema.deleteOne({ _id: req.params.id })
      .exec()
      .then((result) => {
        if (result.deletedCount > 0) {
          res.status(200).json({
            result: true,
            message: "Transação removida com sucesso!",
          });
        } else {
          res.status(404).json({
            result: false,
            message:
              "Nenhuma Transação encontrada com este código. Tente novamente ou contate o nosso suporte.",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          result: false,
          message: "Código de Transação inválido.",
        });
      });
  },
};
