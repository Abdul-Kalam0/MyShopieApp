import Product from "../models/Product";

const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res
      .status(201)
      .json({ success: true, message: "Product Created", product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: "Products data fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getProductByProductId = async (req, res) => {
  try {
    const { productId } = req.query;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Data does not exist" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product fetch successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { createProduct, getAllProducts, getProductByProductId };
