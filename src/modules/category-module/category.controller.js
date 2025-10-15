import { nanoid } from "nanoid";
import slugify from "slugify";
import CategoryModel from "../../../db/models/category-model/category-model.js";
import { updateCategoryValidation } from "./categoryValidation.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find()
    if (!categories || categories.length === 0) {
      return next(new Error("No categories found, please add some categories"));
    }
    return res.json({
      message:
        "All Categories Fetched Successfully including subcategories and brands in my Store  ",
      Categories: categories,
    });
  } catch (err) {
    return next(err);
  }
};

export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await CategoryModel.findById(id);
    if (!category) {
      return next(new Error("Category not found"));
    }

    res.json({
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    next(new Error(`Error fetching category: ${error.message}`));
  }
};

export const addCategory = async (req, res, next) => {
  const { name, description } = req.body;

  const slug = slugify(name, { lower: true, replacement: "_" });
  const customID = nanoid();

  try {
    if (await CategoryModel.findOne({ name })) {
      return next(new Error("Category is already exist"));
    }

    if (!req.file) {
      return next(new Error("Image is required"));
    }

    const categoryObject = {
      name,
      slug,
      description,
      image: {
        secure_url: req.file.path,
        public_id: req.file.filename,
      },
      customID,
      createdBy: req.user?._id,
    };

    const category = await CategoryModel.create(categoryObject);

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    next(new Error(`Error creating category: ${error.message}`));
  }
};

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;

  const { error } = updateCategoryValidation.validate(req.body);
  if (error) {
    return next(new Error(`Validation error: ${error.details[0].message}`));
  }
  const { name, description } = req.body;

  try {
    const category = await CategoryModel.findById(id);
    if (!category) {
      return next(new Error("Category not found"));
    }

    if (name) {
      category.name = name;
      category.slug = slugify(name, { lower: true, replacement: "_" });
    }
    if (description) {
      category.description = description;
    }
    if (req.file) {
      category.image = {
        secure_url: req.file.path,
        public_id: req.file.filename,
      };
    }

    await category.save();

    res.json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    next(new Error(`Error updating category: ${error.message}`));
  }
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) {
      return next(new Error("Category not found"));
    }

    res.json({
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    next(new Error(`Error deleting category: ${error.message}`));
  }
};
