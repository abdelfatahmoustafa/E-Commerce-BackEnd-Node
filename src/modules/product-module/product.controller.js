import slugify from "slugify";
import ProductModel from "../../../db/models/product-model/product-model.js";
import pagination from "../../utils/pagination.js";

export const addProduct = async (req, res, next) => {
  try {
    const { name, category, subCategory, brand } = req.body;
    const slug = slugify(name, { lower: true, replacement: "_" });

    if (!req.file) {
      return next(new Error("Product Image Required"));
    }
    const productObject = {
      ...req.body,
      slug,
      image: {
        secure_url: req.file.path,
        public_id: req.file.filename,
      },

      createdBy: req.user?._id,
    };

    await ProductModel.create(productObject).then((product) => {
      res.json({
        message: "Product Created Successfully",
        product,
      });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error In Add Product ", error: error.message });
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find()
      .populate("category", "name")
      .populate("subCategory", "name")
      .populate("brand", "name")
      .populate("createdBy", "userName email");
    res.json({ message: "All Products", products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error In Get All Products ", error: error.message });
  }
};

export const getLimitProduct = async (req, res, next) => {
  try {
    const { limit, skip } = pagination({ ...req.query });
    const product = await ProductModel.find()
      .limit(limit)
      .skip(skip)
      .populate("category")
      .populate("subCategory")
      .populate("brand")
      .populate("createdBy", "userName email");
    if (!product) {
      return next(new Error("Product Not Found"));
    }
    res.json({ message: "Limit Product", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error In Get Limit Product ", error: error.message });
  }
};
export const searchProduct = async (req, res, next) => {
  const { q } = req.query;
  try {
    const product = await ProductModel.findOne({
      $or: [{ name: { $regex: q, $options: "i" } }],
    })

      .populate("category")
      .populate("subCategory")
      .populate("brand")
      .populate("createdBy", "userName email");
    if (!product) {
      return next(new Error("Product Not Found"));
    }
    res.json({ message: "Search Product", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error In Get Limit Product ", error: error.message });
  }
};

