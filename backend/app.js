const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const cors = require("cors")
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
// Adicionado para permitir que minha api receba json
app.use(express.json());
// Forma melhor pra ver log no desenvolvimento
app.use(morgan("dev"));

// Adicionando permissão de CORS para liberar acesso público
app.use(cors({origin: true}));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Acess-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
// });

app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Iniciando o DB
// mongoose.connect('mongodb://user@password')
// mongoose.connect("mongodb://localhost:27017/gestao_financeira", {
mongoose.set("debug", true);
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;

mongoose.plugin(require("./src/utils/schema/logPlugin"));

// Models devem ficar abaixo da conexão com o banco de dados
requireDir("./src/models");

app.listen(3002);

// importa todas as rotas
app.use("/api", require("./src/routes"));
// libera acesso as imagens
app.use("/uploads", express.static("uploads"));


// middlewares pra tratamentos gerais
app.use((err, req, res, next) => {
  res.status(404);
  // res.json(err);
  res.json({
    message: "Opção não encontrada. Contate nosso suporte.",
  });
});

module.exports = app;
