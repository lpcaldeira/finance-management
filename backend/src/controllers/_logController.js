const mongoose = require("mongoose");
const LogSchema = mongoose.model("Log");

module.exports = {
  async logRequest(req, res, next) {
    console.time(req.method + " - " + req.url); // início
    next(); // executa a rota
    console.timeEnd(req.method + " - " + req.url); // fim
  },
};
