import Category from "../models/Category.js";
import Product from "../models/Product.js";

// ✅ CREATE PRODUCT
export const createProduct = async (req, res) => {
  const {
    category: categoryName,
    description,
    categoryType,
    gender,
    ...productData
  } = req.body;

  try {
    // 🔹 Check or create category
    let category = await Category.findOne({ name: categoryName });
    if (!category) {
      category = await Category.create({
        name: categoryName,
        type: categoryType,
      });
    }

    // 🔹 Prevent duplicates if same name and stock > 0
    const existingProduct = await Product.findOne({ name: productData.name });
    if (existingProduct && existingProduct.stock > 0) {
      return res.status(409).json({
        success: false,
        message: "Product already exists",
        data: { existingProduct },
      });
    }

    // 🔹 Create product
    const product = new Product({
      ...productData,
      category: category._id,
      categoryType,
      description,
      gender, // ✅ Added gender support
    });

    await product.save();

    const populatedProduct = await Product.findById(product._id).populate(
      "category"
    );

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: populatedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating product",
      error: error.message,
    });
  }
};

// ✅ GET ALL PRODUCTS (With Filters)
export const getAllProducts = async (req, res) => {
  try {
    const { q, category, sort, minPrice, maxPrice, minRating, gender } =
      req.query;

    const filter = {};

    // 🔍 Search by name (case-insensitive)
    if (q) filter.name = { $regex: q, $options: "i" };

    // 🎯 Category filter
    if (category) filter.categoryType = category;

    // 🚻 Gender filter
    if (gender && gender !== "All") {
      filter.gender = gender;
    }

    // 💰 Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
      filter.price.$ne = null;
    }

    // ⭐ Minimum rating
    if (minRating) filter.rating = { $gte: Number(minRating) };

    // 🧠 Debug logs (optional)
    console.log("Query Params:", req.query);
    console.log("Applied Filters:", filter);

    // 🔹 Build query
    let query = Product.find(filter).populate("category");

    // 🧾 Sorting (by price)
    if (sort === "asc") query = query.sort({ price: 1 });
    if (sort === "desc") query = query.sort({ price: -1 });

    // 🔹 Execute
    const products = await query.exec();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: { products },
    });
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
      error: error.message,
    });
  }
};

// ✅ GET PRODUCT BY ID
export const getProductByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).populate("category");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: { product },
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching product",
      error: error.message,
    });
  }
};

// ✅ UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    }).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found for update",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: { product },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating product",
      error: error.message,
    });
  }
};

// ✅ DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deleted = await Product.findByIdAndDelete(productId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found for deletion",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting product",
      error: error.message,
    });
  }
};
