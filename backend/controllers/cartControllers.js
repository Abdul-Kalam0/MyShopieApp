import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    res.status(200).json({ success: true, data: cart || { items: [] } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, qty = 1, size } = req.body;
    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    const idx = cart.items.findIndex(
      (i) => i.product.equals(productId) && i.size === size
    );
    if (idx > -1) cart.items[idx].qty = Math.max(1, cart.items[idx].qty + qty);
    else cart.items.push({ product: productId, qty, size });

    await cart.save();
    const populated = await cart.populate("items.product");
    res.status(200).json({ success: true, data: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, qty, size } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.equals(productId) && i.size === size
    );
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });

    item.qty = qty;
    await cart.save();
    const populated = await cart.populate("items.product");
    res.status(200).json({ success: true, data: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { productId, size } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => !(i.product.equals(productId) && i.size === size)
    );
    await cart.save();
    const populated = await cart.populate("items.product");
    res.status(200).json({ success: true, data: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
