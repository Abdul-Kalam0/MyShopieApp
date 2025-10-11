import Category from "../models/Category.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: { categories },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getCategoryByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: { category },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { getAllCategories, getCategoryByCategoryId };
