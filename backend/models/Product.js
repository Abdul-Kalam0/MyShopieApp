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
      type: mongoose.Schema.Types.ObjectId, // store reference ID
      ref: "Category", // reference the Category model
      required: true, // every product must have a category
    },
    categoryType: {
      type: String, // store the type of the category
      required: true, // optional, depends on your app logic
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

// Pre-save hook to calculate discountPercent
productSchema.pre("save", function (next) {
  if (this.originalPrice && this.price) {
    this.discountPercent = Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
  next();
});

export default mongoose.model("Product", productSchema);
