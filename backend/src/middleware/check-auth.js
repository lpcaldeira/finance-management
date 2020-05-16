const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.body.token || req.headers.authorization.split(" ")[1]; // bearer
    const verify = jwt.verify(token, process.env.JWT_KEY);
    req.userData = verify;
    next();
  } catch (err) {
    return res.status(401).json({
      result: false,
      message: "Token inválido.",
    });
  }
};
