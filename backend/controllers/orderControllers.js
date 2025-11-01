import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {
  try {
    const { addressId } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!cart || !cart.items.length)
      return res.status(400).json({ success: false, message: "Cart empty" });

    const items = cart.items.map((it) => ({
      product: it.product._id,
      qty: it.qty,
      price: it.product.price,
      size: it.size,
    }));

    const totalAmount = items.reduce((s, i) => s + i.qty * i.price, 0);

    const order = await Order.create({
      user: req.user._id,
      items,
      address: addressId,
      totalAmount,
      status: "Placed",
      paymentStatus: "Successfull",
    });

    // clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      data: order,
      message: "Order placed successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .populate("address");
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
