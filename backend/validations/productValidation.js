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
    .optional(), // now optional
  category: Joi.string().required(), // category name from frontend
  categoryType: Joi.string().required(), // new field, must be provided
  brand: Joi.string().optional().default("Unknown"),
  stock: Joi.number().min(0).default(10),
  imageUrl: Joi.string().uri().required(),
  isFeatured: Joi.boolean().optional().default(false),
  returnPolicy: Joi.string().optional().default("10 days Returnable"),
  deliveryType: Joi.string().optional().default("Free Delivery"),
  paymentOptions: Joi.array()
    .items(Joi.string())
    .optional()
    .default(["Cash on Delivery", "Secure Payment"]),
});
