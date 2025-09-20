import slugify from "slugify";
import ProductModel from "../../../db/models/product-model/product-model.js";
import e from "express";

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
export const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id)
      .populate("category")
      .populate("subCategory")
      .populate("brand")
      .populate("createdBy", "userName email");
    if (!product) {
      return next(new Error("Product Not Found"));
    }
    res.json({ message: "Single Product", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error In Get Single Product ", error: error.message });
  }
};
