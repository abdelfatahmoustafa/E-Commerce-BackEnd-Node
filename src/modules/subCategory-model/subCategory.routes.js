import express from "express";
import * as all from "./subCategory.controller.js";
import Upload from "../../services/multer.js";
const subCategoryRouter = express.Router();

const uploadSubCategoryImage = Upload("categories/subCategories");
subCategoryRouter.post(
  "/addSubCategory",
  uploadSubCategoryImage.single("image"),
  all.addSubCategory
);
subCategoryRouter.get("/getSubCategories", all.getSubCategories);
export default subCategoryRouter;
