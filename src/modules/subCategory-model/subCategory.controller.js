import slugify from "slugify";
import SubCategoryModel from "../../../db/models/subCategory-model/subCategory-model.js";

export const addSubCategory = async (req, res, next) => {
  //   const { category } = req.params;
  const { name, category } = req.body;
  const slug = slugify(name, { lower: true, replacement: "_" });
  try {
    if (await SubCategoryModel.findOne({ name })) {
      return next(new Error("SubCategory is already exist"));
    }
    if (!req.file) {
      return next(new Error("Image is required"));
    }
    const subCategoryObject = {
      name,
      slug,
      category,
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

export const getSubCategories = async (req, res, next) => {
  try {
    const subCategories = await SubCategoryModel.find().populate("category");

    if (!subCategories || subCategories.length === 0) {
      return next(
        new Error("No SubCategories found, please add some categories")
      );
    }

    return res.json({
      message: "All SubCategories",
      result: subCategories,
    });
  } catch (err) {
    return next(err);
  }
};
