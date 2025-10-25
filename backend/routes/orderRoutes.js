import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import { createOrder, getOrders } from "../controllers/orderControllers.js";

router.use(auth);
router.post("/", createOrder);
router.get("/", getOrders);

export default router;
