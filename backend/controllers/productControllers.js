import Category from "../models/Category";
import Product from "../models/Product";

const createProduct = async (req, res) => {
  const { category: categoryName, categoryType, ...productData } = req.body;
  try {
    //find the category data from the category to get category Id
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      category = new Category.create({
        name: categoryName,
        type: categoryType,
      });
    }

    const product = new Product({
      ...productData,
      category: categoryName._id,
      categoryType,
    });

    await product.save();

    // 3️⃣ Populate category for response
    const populatedProduct = await Product.findById(product._id).populate(
      "category"
    );
    res
      .status(201)
      .json({
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
