const mongoose = require("mongoose");
const UserSchema = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async find(req, res, next) {
    const { page = 1 } = req.query;
    await UserSchema.paginate({}, { page, limit: 10 })
      .then((result) => {
        let { docs, ...response } = result;
        response.docs = docs.map((doc) => {
          return {
            _id: doc._id,
            firstname: doc.firstname,
            lastname: doc.lastname,
            email: doc.email,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            request: {
              type: "GET",
              url: "http://localhost:3001/api/users/" + doc._id,
            },
          };
        });
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({
          result: false,
          message:
            "Ocorreu algum problema na busca dos usuários. Tente novamente ou contate o nosso suporte.",
        });
      });
  },

  async signup(req, res, next) {
    console.log("valida o email se já existe", req.body.email)
    // verifica se o email já existe para personalizar a mensagem
    UserSchema.find({ email: req.body.email })
      .exec()
      .then(async (user) => {
        if (user.length >= 1) {
          console.log("já existe")
          return res.status(500).json({
            result: false,
            message:
              "Já existe um usuário cadastrado com este e-mail. Caso não lembre a senha, utilize a opção 'Esqueci minha senha'.",
          });
        } else if (
          // new RegExp("^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$").test(String(req.body.email).toLowerCase())
          new RegExp("S+@S+.S+").test(String(req.body.email).toLowerCase())
          // new RegExp("[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?").test(String(req.body.email).toLowerCase())
        ) {
          console.log("email inválido")
          return res.status(500).json({
            result: false,
            message: "Informe um e-mail válido!",
          });
        } else {
          console.log("vai criar");
          try {
            const { email, password, firstname, lastname } = req.body;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            // console.log("hashedPassword: ", hashedPassword);
            // console.log("password: ", password);
            const user = new UserSchema({
              _id: new mongoose.Types.ObjectId(),
              email,
              password,
              firstname,
              lastname,
            });
            user.password = hashedPassword;
            user
              .save(user)
              .then((result) => {
                res.status(201).json({
                  result: true,
                  message: "Usuário adicionado com sucesso!",
                  // userObject: result,
                  request: {
                    type: "GET",
                    url: "http://localhost:3001/api/users/" + result._id,
                  },
                });
              })
              .catch((err) => {
                console.log(err.message);
                res.status(500).json({
                  result: false,
                  message:
                    "Não foi possível adicionar o seu usuário neste momento. Tente novamente ou contate o nosso suporte.",
                });
              });
          } catch (err) {
            console.log(err.message);
            return res.status(500).json({
              result: false,
              message:
                "Não foi possível adicionar este usuário. Tente novamente ou contate nosso suporte.",
            });
          }
        }
      });
  },

  async signin(req, res, next) {
    const { email, password } = req.body;
    await UserSchema.find({ email: email })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          return res.status(404).json({
            message: "Usuário não encontrado com este e-mail.",
          });
        }
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (result) {
            console.log("senha certa", process.env.JWT_KEY);
            const token = jwt.sign(
              {
                email: user[0].email,
                id: user[0]._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1d",
              }
            );

            return res.status(200).json({
              result: true,
              message: "Seja bem vindo, " + user[0].firstname,
              token: token,
            });
          }

          return res.status(401).json({
            result: false,
            message: "Senha inválida!",
          });
        });
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({
          result: false,
          message:
            "Não foi possível fazer login neste momento. Tente novamente ou contate o nosso suporte.",
        });
      });
  },

  async delete(req, res, next) {
    UserSchema.remove({ _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(200).json({ message: "Usuário excluído com sucesso!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          // message: err.message
          message:
            "Não foi possível excluir o usuário neste momento. Tente novamente ou contate nosso suporte.",
        });
      });
  },
};
