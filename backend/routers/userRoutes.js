import express from "express";

const router = express.Router();

import {
  userRegistration,
  userLogin,
  userLogOut,
} from "../controllers/userControllers.js";
import userValidation from "../middlewares/userValidation.js";
import userValidationSchema from "../validations/userValidation.js";

router.post(
  "/registration",
  userValidation(userValidationSchema),
  userRegistration
);
router.post("/login", userLogin);
router.post("/logout", userLogOut);

export default router;
