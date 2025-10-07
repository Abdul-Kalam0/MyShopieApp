import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    sizes: {
      type: [String], // Example: ["S", "M", "L", "XL", "XXL"]
      default: [],
    },
    category: {
      type: String,
      default: "Apparel",
    },
    brand: {
      type: String,
      default: "Unknown",
    },
    stock: {
      type: Number,
      default: 10,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    returnPolicy: {
      type: String,
      default: "10 days Returnable",
    },
    deliveryType: {
      type: String,
      default: "Free Delivery",
    },
    paymentOptions: {
      type: [String],
      default: ["Cash on Delivery", "Secure Payment"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
