import express from "express";
const router = express.Router();
import {
  userRegistration,
  userLogin,
  userLogOut,
  getLoggedInUser,
} from "../controllers/userControllers.js";
import userValidation from "../middlewares/userValidation.js";
import userValidationSchema from "../validations/userValidation.js";
import auth from "../middlewares/auth.js";

router.post(
  "/registration",
  userValidation(userValidationSchema),
  userRegistration
);
router.post("/login", userLogin);
router.post("/logout", userLogOut);

router.get("/me", auth, getLoggedInUser);

export default router;
