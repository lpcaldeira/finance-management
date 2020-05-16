const _ = require("lodash");
const mongoose = require("mongoose");
const ProductSchema = mongoose.model("Product");
const { getDiff } = require("../utils/diff");

module.exports = {
  async find(req, res, next) {
    const { page = 1 } = req.query;
    await ProductSchema.paginate({}, { page, limit: 10 })
      // ;
      // ProductSchema.find()
      //   .select("_id title description price createdAt updatedAt")
      //   .exec()
      .then((result) => {
        let { docs, ...response } = result;
        response.docs = docs.map((doc) => {
          return {
            _id: doc._id,
            title: doc.title,
            description: doc.description,
            price: doc.price,
            salePrice: doc.salePrice,
            productImage: doc.productImage,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            request: {
              type: "GET",
              url: "http://localhost:3001/api/products/" + doc._id,
            },
          };
        });
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({
          result: false,
          message:
            "Ocorreu algum problema na busca dos produtos. Tente novamente ou contate o nosso suporte.",
        });
      });
  },

  async findById(req, res, next) {
    const id = req.params.id;
    if (id == "idsupersecreto") {
      res.status(200).json({
        result: true,
        message: "Você descobriu o código secreto deste sistema!!!",
      });
    } else {
      await ProductSchema.findById(id)
        .select("_id title description price salePrice productImage createdAt updatedAt")
        .exec()
        .then((result) => {
          if (result) {
            res.status(200).json({
              result: true,
              // message: "Produto adicionado com sucesso!",
              productObject: result,
              request: {
                type: "GET",
                url: "http://localhost:3001/api/products/",
              },
            });
          } else {
            res.status(404).json({
              result: false,
              message:
                "Nenhum produto encontrado com este código. Tente novamente ou contate o nosso suporte.",
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            result: false,
            message: "Código de produto inválido.",
          });
        });
    }
  },

  async create(req, res, next) {
    console.log(req.file);
    console.log(req.body);
    let productImage = {}
    if (req.file){
      productImage = {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        destination: req.file.destination,
        filename: req.file.filename,
        size: req.file.size,
      }
    }
    const product = new ProductSchema({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      salePrice: req.body.salePrice,
      productImage: productImage
    });

    product
      .save()
      .then((result) => {
        res.status(201).json({
          result: true,
          message: "Produto adicionado com sucesso!",
          productObject: result,
          request: {
            type: "GET",
            url: "http://localhost:3001/api/products/" + result._id,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          result: false,
          message:
            "Não foi possível adicionar seu produto. Tente novamente ou contate o nosso suporte.",
        });
      });
  },

  async update(req, res, next) {
    const id = req.params.id;
    // usar o getDiff para mudar apenas as propriedades que forem diferentes
    // não validei o envio de um campo que não exista no modelo
    ProductSchema.findById(id)
      .exec()
      .then((result) => {
        if (result) {
          const updateOps = getDiff(req.body, result);
          ProductSchema.updateOne(
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
                  message: "Produto atualizado com sucesso!",
                  request: {
                    type: "GET",
                    url: "http://localhost:3001/api/products/" + id,
                  },
                });
              } else {
                res.status(404).json({
                  result: false,
                  message:
                    "Nenhum produto encontrado com este código. Tente novamente ou contate o nosso suporte.",
                });
              }
            })
            .catch((err) => {
              res.status(500).json({
                result: false,
                message: "Código de produto inválido.",
              });
            });
        } else {
          res.status(404).json({
            result: false,
            message:
              "Nenhum produto encontrado com este código. Tente novamente ou contate o nosso suporte.",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          result: false,
          message: "Código de produto inválido.",
        });
      });
  },

  async delete(req, res, next) {
    ProductSchema.deleteOne({ _id: req.params.id })
      .exec()
      .then((result) => {
        if (result.deletedCount > 0) {
          res.status(200).json({
            result: true,
            message: "Produto removido com sucesso!",
          });
        } else {
          res.status(404).json({
            result: false,
            message:
              "Nenhum produto encontrado com este código. Tente novamente ou contate o nosso suporte.",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          result: false,
          message: "Código de produto inválido.",
        });
      });
  },

  // async getAll(req, res) {
  //   const { page = 1 } = req.query;
  //   return res.json(await ProductSchema.paginate({}, { page, limit: 10 }));
  // },

  // async detail(req, res) {
  //   return res.json(
  //     await ProductSchema.findById(res.params.id).then((product) => {
  //       if (product && typeof product.log === "function") {
  //         const data = {
  //           action: "findById-product",
  //           category: "product",
  //           createdBy: req.product.id,
  //           message: "Buscando o produto por id",
  //         };
  //         return product.log(data);
  //       }
  //     })
  //   );
  // },

  // async create(req, res) {
  //   return res.json(await ProductSchema.create(req.body));
  // },

  // async update(req, res) {
  //   // Com o new:true, vai voltar todo o registro atualizado corretamente
  //   return res.json(
  //     await ProductSchema.findByIdAndUpdate(req.params.id, req.body, {
  //       new: true,
  //     })
  //   );
  // },

  // async delete(req, res) {
  //   await ProductSchema.findByIdAndDelete(req.params.id);
  //   return res.send("O registro foi removido com sucesso!");
  // },
};
