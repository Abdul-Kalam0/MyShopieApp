import Category from "../models/Category.js";
import Product from "../models/Product.js";

const createProduct = async (req, res) => {
  const {
    category: categoryName,
    description,
    categoryType,
    ...productData
  } = req.body;

  try {
    // Find category by name
    let category = await Category.findOne({ name: categoryName });

    // If category does not exist, create it
    if (!category) {
      category = await Category.create({
        name: categoryName,
        type: categoryType,
      });
    }

    //check if product already exist
    const existingProduct = await Product.findOne({ description });
    if (existingProduct.stock > 0)
      return res.status(409).json({
        success: false,
        message: "Product already exist",
        data: { existingProduct },
      });

    // Create product with category ID
    const product = new Product({
      ...productData,
      category: category._id, // ✅ assign category ObjectId
      categoryType,
      description,
    });

    await product.save();

    // Populate category in response
    const populatedProduct = await Product.findById(product._id).populate(
      "category"
    );

    res.status(201).json({
      success: true,
      message: "Product Created",
      data: populatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({
      success: true,
      message: "Products data fetched successfully",
      data: { products },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getProductByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate("category");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Data does not exist" });
    }
    res.status(200).json({
      success: true,
      message: "Product fetch successfully",
      data: { product },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { createProduct, getAllProducts, getProductByProductId };
