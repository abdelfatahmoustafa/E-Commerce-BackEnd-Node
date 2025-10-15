import slugify from "slugify";
import SubCategoryModel from "../../../db/models/subCategory-model/subCategory-model.js";
  
export const getSubCategories = async (req, res, next) => {
   try {
    const subCategories = await SubCategoryModel.find()
      .populate({
        path: "brands",
        populate: { path: "subCategoryID", select: "name" },
      })
      .populate("categoryID", "name");

    if (!subCategories || subCategories.length === 0) {
      return next(
        new Error("No SubCategories found, please add some categories")
      );
    }

    return res.json({
      message: "All SubCategories fetched successfully ",
      result: subCategories,
    });
  } catch (err) {
    return next(err);
  }
};

export const getSubCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const subCategory = await SubCategoryModel.findById(id)
      .populate({
        path: "brands",
        populate: { path: "subCategoryID", select: "name" },
      })
      .populate("categoryID", "name");
    if (!subCategory) {
      return next(new Error("No SubCategory found"));
    }
    return res.json({
      message: "SubCategory found",
      result: subCategory,
    });
  } catch (err) {
    return next(err);
  }
};

export const addSubCategory = async (req, res, next) => {
  const { name, categoryID } = req.body;
  const slug = slugify(name, { lower: true, replacement: "_" });
  try {
    if (await SubCategoryModel.findOne({ name })) {
      return next(new Error("SubCategory is already exist"));
    }
    if (!req.file) {
      return next(new Error("Image is required"));
    }
    const subCategoryObject = {
      ...req.body,
      categoryID,
      slug,
      image: {
        secure_url: req.file.path,
        public_id: req.file.filename,
      },
    };

    await SubCategoryModel.create(subCategoryObject).then((result) => {
      res.json({
        message: "SubCategory created successfully",
        result,
      });
    });
  } catch (err) {
    return next(new Error(err));
  }
};

export const updateSubCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const { name, categoryID, description } = req.body;
  const slug = slugify(name, { lower: true, replacement: "_" });
  try {
    const subCategory = await SubCategoryModel.findById(id);
    if (!subCategory) {
      return next(new Error("No SubCategory found"));
    }
    if (name) subCategory.name = name;
    if (categoryID) subCategory.categoryID = categoryID;
    if (name) subCategory.slug = slug;
    if (description) subCategory.description = description;
    if (req.file) {
      subCategory.image = {
        secure_url: req.file.path,
        public_id: req.file.filename,
      };
    }

    await subCategory.save();
    return res.json({
      message: "SubCategory updated successfully",
      result: subCategory,
    });
  } catch (err) {
    return next(err);
  }
};

export const deleteSubCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const subCategory = await SubCategoryModel.findByIdAndDelete(id);
    if (!subCategory) {
      return next(new Error("No SubCategory found"));
    }
    return res.json({
      message: "SubCategory deleted successfully",
      result: subCategory,
    });
  } catch (err) {
    return next(err);
  }
};
