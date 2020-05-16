const _ = require("lodash");
const mongoose = require("mongoose");
const TaxSchema = mongoose.model("Tax");
const { getDiff } = require("../utils/diff");

module.exports = {
  async find(req, res, next) {
    const { page = 1 } = req.query;
    await TaxSchema.paginate({}, { page, limit: 10 })
      .then((result) => {
        let { docs, ...response } = result;
        response.docs = docs.map((doc) => {
          return {
            _id: doc._id,
            price: doc.price,
            paid: doc.paid,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            request: {
              type: "GET",
              url: "http://localhost:3001/api/taxes/" + doc._id,
            },
          };
        });
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({
          result: false,
          message:
            "Ocorreu algum problema na busca dos impostos. Tente novamente ou contate o nosso suporte.",
        });
      });
  },

  async findById(req, res, next) {
    const id = req.params.id;
    await TaxSchema.findById(id)
      .select("_id price paid createdAt updatedAt")
      .exec()
      .then((result) => {
        if (result) {
          res.status(200).json({
            result: true,
            taxObject: result,
            request: {
              type: "GET",
              url: "http://localhost:3001/api/taxes/",
            },
          });
        } else {
          res.status(404).json({
            result: false,
            message:
              "Nenhum imposto encontrado com este código. Tente novamente ou contate o nosso suporte.",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          result: false,
          message: "Código de imposto inválido.",
        });
      });
  },

  async create(req, res, next) {
    const Tax = new TaxSchema({
      _id: new mongoose.Types.ObjectId(),
      price: req.body.price,
      paid: req.body.paid,
    });

    Tax.save()
      .then((result) => {
        res.status(201).json({
          result: true,
          message: "Imposto adicionado com sucesso!",
          taxObject: result,
          request: {
            type: "GET",
            url: "http://localhost:3001/api/taxes/" + result._id,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          result: false,
          message:
            "Não foi possível adicionar o seu imposto. Tente novamente ou contate o nosso suporte.",
        });
      });
  },

  async update(req, res, next) {
    const id = req.params.id;
    // usar o getDiff para mudar apenas as propriedades que forem diferentes
    // não validei o envio de um campo que não exista no modelo
    TaxSchema.findById(id)
      .exec()
      .then((result) => {
        if (result) {
          const updateOps = getDiff(req.body, result);
          TaxSchema.updateOne(
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
                  message: "Imposto atualizado com sucesso!",
                  request: {
                    type: "GET",
                    url: "http://localhost:3001/api/taxes/" + id,
                  },
                });
              } else {
                res.status(404).json({
                  result: false,
                  message:
                    "Nenhum imposto encontrado com este código. Tente novamente ou contate o nosso suporte.",
                });
              }
            })
            .catch((err) => {
              res.status(500).json({
                result: false,
                message: "Código de imposto inválido.",
              });
            });
        } else {
          res.status(404).json({
            result: false,
            message:
              "Nenhum imposto encontrado com este código. Tente novamente ou contate o nosso suporte.",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          result: false,
          message: "Código de imposto inválido.",
        });
      });
  },

  async delete(req, res, next) {
    TaxSchema.deleteOne({ _id: req.params.id })
      .exec()
      .then((result) => {
        if (result.deletedCount > 0) {
          res.status(200).json({
            result: true,
            message: "Imposto removido com sucesso!",
          });
        } else {
          res.status(404).json({
            result: false,
            message:
              "Nenhum imposto encontrado com este código. Tente novamente ou contate o nosso suporte.",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          result: false,
          message: "Código de imposto inválido.",
        });
      });
  },

  // async findById(req, res) {
  //   return res.json(
  //     await TaxSchema.findById(res.params.id).then((Tax) => {
  //       if (Tax && typeof Tax.log === "function") {
  //         const data = {
  //           action: "findById-Tax",
  //           category: "Tax",
  //           createdBy: req.Tax.id,
  //           message: "Buscando o produto por id",
  //         };
  //         return Tax.log(data);
  //       }
  //     })
  //   );
  // },
};
