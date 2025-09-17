import { nanoid } from "nanoid";
import slugify from "slugify";
import CategoryModel from "../../../db/models/category-model/category-model.js";

export const addCategory = async (req, res, next) => {
  const { name, description } = req.body;
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

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
        secure_url: req.file.path,     // Cloudinary URL
        public_id: req.file.filename,  // Cloudinary public_id
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
