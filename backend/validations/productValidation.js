// validations/productValidation.js
import Joi from "joi";

export const productValidationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().positive().required(),
  originalPrice: Joi.number().positive().required(),
  discountPercent: Joi.number().min(0).max(100).optional(),
  rating: Joi.number().min(0).max(5).optional(),
  numReviews: Joi.number().min(0).optional(),
  sizes: Joi.array()
    .items(Joi.string().valid("S", "M", "L", "XL", "XXL"))
    .required(),
  category: Joi.string().required(),
  brand: Joi.string().optional(),
  stock: Joi.number().min(0).default(0),
  imageUrl: Joi.string().uri().required(),
  isFeatured: Joi.boolean().optional(),
  returnPolicy: Joi.string().optional(),
  deliveryType: Joi.string().optional(),
  paymentOptions: Joi.array().items(Joi.string()).optional(),
});
