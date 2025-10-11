// validations/userValidation.js
import Joi from "joi";

const userValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(30).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password cannot exceed 30 characters",
  }),
  mobileNumber: Joi.number()
    .integer()
    .min(1000000000) // assuming 10-digit numbers
    .max(9999999999)
    .required(),
  email: Joi.string().email().required(),
  address: Joi.string().min(5).max(200).required(),
});

export default userValidationSchema;
