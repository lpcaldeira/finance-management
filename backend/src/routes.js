const express = require("express");
const routes = express.Router();

const productController = require("./controllers/productController");
const transactionController = require("./controllers/transactionController");
const taxController = require("./controllers/taxController");
const userController = require("./controllers/userController");

const multer = require("multer");
// const upload = multer({ dest: 'uploads/'})
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, new Date().getTime().toString() + file.originalname);
  },
});
const fileFilter = (req, file, callback) => {
  const mimeTypes = ["image/jpg", "image/jpeg", "image/png"];
  // segue o baile
  if (mimeTypes.includes(file.mimetype)) callback(null, true);
  // rejeitar o arquivo
  else callback(null, false);
};
const upload = multer({
  storage: storage,
  limits: {
    filesize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter: fileFilter,
});

const checkAuth = require("./middleware/check-auth")

routes.get("/products", checkAuth, productController.find);
routes.get("/products/:page", checkAuth, productController.find);
routes.get("/products/:id", checkAuth, productController.findById);
routes.post(
  "/products",
  upload.single("productImage"),
  checkAuth,
  productController.create
);
routes.patch("/products/:id", checkAuth, productController.update);
routes.delete("/products/:id", checkAuth, productController.delete);

routes.get("/transactions", checkAuth, transactionController.find);
routes.get("/transactions/:id", checkAuth, transactionController.findById);
routes.post("/transactions", checkAuth, transactionController.create);
routes.patch("/transactions/:id", checkAuth, transactionController.update);
routes.delete("/transactions/:id", checkAuth, transactionController.delete);

routes.get("/taxes", checkAuth, taxController.find);
routes.get("/taxes/:id", checkAuth, taxController.findById);
routes.post("/taxes", checkAuth, taxController.create);
routes.patch("/taxes/:id", checkAuth, taxController.update);
routes.delete("/taxes/:id", checkAuth, taxController.delete);

routes.get("/users", checkAuth, userController.find);
// routes.get("/users/:id", checkAuth, userController.detail);
// routes.post("/users", checkAuth, userController.create);
// routes.patch("/users/:id", checkAuth, userController.update);
routes.post("/users/signup", userController.signup);
routes.post("/users/signin", userController.signin);
routes.delete("/users/:id", checkAuth, userController.delete);

module.exports = routes;
