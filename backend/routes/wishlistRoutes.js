import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlistControllers.js";

router.use(auth);
router.get("/", getWishlist);
router.post("/", addToWishlist);
router.delete("/", removeFromWishlist);

export default router;
