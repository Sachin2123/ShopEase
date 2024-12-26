const express = require("express");
const {
  addProduct,
  fetchProducts,
  approveProduct,
  approveProductList,
} = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/products", addProduct);
router.get("/products", fetchProducts);
router.put("/products/:id/approve", approveProduct);
router.get("/products_approve", approveProductList);

module.exports = router;
