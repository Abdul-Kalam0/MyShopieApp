import express from "express";
const router = express.Router();

import {
  createProduct,
  getAllProducts,
  getProductByProductId,
} from "../controllers/productControllers.js";
import { productValidationSchema } from "../validations/productValidation.js";
import productValidation from "../middlewares/productValidation.js";

router.post("/", productValidation(productValidationSchema), createProduct);
router.get("/", getAllProducts);
router.get("/:productId", getProductByProductId);

export default router;
