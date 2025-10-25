import express from "express";
const router = express.Router();

import {
  getAllCategories,
  getCategoryByCategoryId,
} from "../controllers/categoryControllers.js";

router.get("/", getAllCategories);
router.get("/:categoryId", getCategoryByCategoryId);

export default router;
