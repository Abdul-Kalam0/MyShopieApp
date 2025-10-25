import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressControllers.js";

router.use(auth);
router.get("/", getAddresses);
router.post("/", addAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export default router;
