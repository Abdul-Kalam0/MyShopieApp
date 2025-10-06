import express from "express";
const router = express.Router();
import {
  createProduct,
  getAllProduct,
  getProductByProductId,
} from "../controllers/productControllers.js";

router.post("/", createProduct);
router.get("/", getAllProduct);
router.get("/:productId", getProductByProductId);

export default router;
