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

export const getAllProducts = async (req, res) => {
  try {
    const { q, category, sort, minPrice, maxPrice, minRating } = req.query;
    const filter = {};

    // ✅ Search by name (q=)
    if (q) filter.name = { $regex: q, $options: "i" };

    // ✅ Filter by category (now based on category names like "Men", "Women")
    if (category) {
      // Ensure category is an array (handle both string and array inputs)
      const categoryNames = Array.isArray(category) ? category : [category];

      // Find category IDs where name matches the selected names
      const matchingCategories = await Category.find({
        name: { $in: categoryNames },
      });
      const categoryIds = matchingCategories.map((cat) => cat._id);

      // Filter products where category._id is in the matching IDs
      if (categoryIds.length > 0) {
        filter.category = { $in: categoryIds };
      } else {
        // If no matching categories, return no products (or handle as needed)
        return res.status(200).json({
          success: true,
          message: "No matching categories found",
          data: { products: [] },
        });
      }
    }

    // ✅ Filter by price range (minPrice and maxPrice)
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
      // Exclude null prices to avoid issues
      filter.price.$ne = null;
    }

    // ✅ Filter by min rating
    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    // 🐛 DEBUG: Log the filter and query params
    console.log("Query Params:", {
      q,
      category,
      sort,
      minPrice,
      maxPrice,
      minRating,
    });
    console.log("Applied Filter:", filter);

    let query = Product.find(filter).populate("category");

    // ✅ Price sorting
    if (sort === "asc") query = query.sort({ price: 1 });
    if (sort === "desc") query = query.sort({ price: -1 });

    const products = await query.exec();

    // 🐛 DEBUG: Log the number of products returned
    console.log(`Found ${products.length} products`);

    res.status(200).json({
      success: true,
      message: "Products data fetched successfully",
      data: { products },
    });
  } catch (error) {
    console.error("Error in getAllProducts:", error);
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
