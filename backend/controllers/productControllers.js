import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  const {
    category: categoryName,
    description,
    categoryType,
    ...productData
  } = req.body;
  try {
    let category = await Category.findOne({ name: categoryName });
    if (!category) {
      category = await Category.create({
        name: categoryName,
        type: categoryType,
      });
    }

    const existingProduct = await Product.findOne({ name: productData.name });
    if (existingProduct && existingProduct.stock > 0)
      return res.status(409).json({
        success: false,
        message: "Product already exist",
        data: { existingProduct },
      });

    const product = new Product({
      ...productData,
      category: category._id,
      categoryType,
      description,
    });
    await product.save();

    const populatedProduct = await Product.findById(product._id).populate(
      "category"
    );
    res.status(201).json({
      success: true,
      message: "Product Created",
      data: populatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// export const getAllProducts = async (req, res) => {
//   try {
//     const { q, category, sort } = req.query;
//     const filter = {};

//     // ✅ Search by name (q=)
//     if (q) filter.name = { $regex: q, $options: "i" };

//     // ✅ Filter by categoryType (T-Shirts, Jeans, Hoodies, etc.)
//     if (category) {
//       filter.categoryType = category;
//     }

//     let query = Product.find(filter).populate("category");

//     // ✅ Price sorting
//     if (sort === "asc") query = query.sort({ price: 1 });
//     if (sort === "desc") query = query.sort({ price: -1 });

//     const products = await query.exec();

//     res.status(200).json({
//       success: true,
//       message: "Products data fetched successfully",
//       data: { products },
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

export const getAllProducts = async (req, res) => {
  try {
    const { q, category, sort } = req.query;
    const filter = {};

    // ✅ Search by name (q=)
    if (q) filter.name = { $regex: q, $options: "i" };

    // ✅ Filter by categoryType (T-Shirts, Jeans, Hoodies, etc.)
    if (category) {
      filter.categoryType = category;
    }

    // ✅ Filter by max price (NEW: Fixes the slider)
    if (req.query.maxPrice) {
      filter.price = { $lte: Number(req.query.maxPrice) };
    }

    // ✅ Filter by min rating (NEW: For completeness)
    if (req.query.minRating) {
      filter.rating = { $gte: Number(req.query.minRating) };
    }

    let query = Product.find(filter).populate("category");

    // ✅ Price sorting
    if (sort === "asc") query = query.sort({ price: 1 });
    if (sort === "desc") query = query.sort({ price: -1 });

    const products = await query.exec();

    res.status(200).json({
      success: true,
      message: "Products data fetched successfully",
      data: { products },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getProductByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate("category");
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Data does not exist" });
    res.status(200).json({
      success: true,
      message: "Product fetch successfully",
      data: { product },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
