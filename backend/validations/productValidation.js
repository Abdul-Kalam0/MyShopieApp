import Joi from "joi";

export const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  originalPrice: Joi.number().required(),

  // auto-calculated by Mongoose
  // discountPercent: Joi.number(), ❌ remove

  rating: Joi.number().min(0).max(5).optional(),
  numReviews: Joi.number().optional(),

  sizes: Joi.array().items(Joi.string()).default([]),

  // category name as string
  category: Joi.string().required(),
  categoryType: Joi.string().allow("", null),

  // 🆕 Gender validation
  gender: Joi.string()
    .valid("Men", "Women", "Unisex")
    .default("Unisex")
    .required(),

  brand: Joi.string().default("Unknown"),
  stock: Joi.number().default(10),

  imageUrl: Joi.string().uri().required(),

  isFeatured: Joi.boolean().default(false),

  returnPolicy: Joi.string().default("10 days Returnable"),

  deliveryType: Joi.string().default("Free Delivery"),

  paymentOptions: Joi.array()
    .items(Joi.string())
    .default(["Cash on Delivery", "Secure Payment"]),
});
