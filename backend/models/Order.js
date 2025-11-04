import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    qty: Number,
    price: Number,
    size: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    totalAmount: Number,
    status: { type: String, default: "Placed" },
    paymentStatus: { type: String, default: "Success" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
