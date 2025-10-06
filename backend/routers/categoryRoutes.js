import express from "express";
const router = express.Router();

import { getProductsByCategory } from "../controllers/categoryControllers.js";

router.get("/", getProductsByCategory);

export default router;
