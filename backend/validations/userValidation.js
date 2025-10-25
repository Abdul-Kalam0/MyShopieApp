import Joi from "joi";

const userValidationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  mobileNumber: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().allow("", null),
});

export default userValidationSchema;
