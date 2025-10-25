import Joi from "joi";

export const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  originalPrice: Joi.number().required(),

  // This is auto-calculated by mongoose — do NOT accept from user
  // discountPercent: Joi.number(),  ❌ NO — not from user

  rating: Joi.number().min(0).max(5).optional(), // Optional, default from db
  numReviews: Joi.number().optional(), // Optional, default from db

  sizes: Joi.array().items(Joi.string()).default([]),

  // Accept category as string for input, will be converted to ObjectId in backend
  category: Joi.string().required(),
  categoryType: Joi.string().allow("", null),

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
