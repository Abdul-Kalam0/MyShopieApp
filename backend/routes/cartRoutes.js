import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartControllers.js";

router.use(auth);
router.get("/", getCart);
router.post("/", addToCart);
router.put("/", updateCartItem);
router.delete("/", removeCartItem);

export default router;
