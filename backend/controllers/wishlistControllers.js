import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      "products"
    );
    res.status(200).json({ success: true, data: wishlist || { products: [] } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist)
      wishlist = new Wishlist({ user: req.user._id, products: [] });

    if (!wishlist.products.find((p) => p.equals(productId)))
      wishlist.products.push(productId);
    await wishlist.save();
    const populated = await wishlist.populate("products");
    res.status(200).json({ success: true, data: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist)
      return res
        .status(404)
        .json({ success: false, message: "Wishlist not found" });

    wishlist.products = wishlist.products.filter((p) => !p.equals(productId));
    await wishlist.save();
    const populated = await wishlist.populate("products");
    res.status(200).json({ success: true, data: populated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
