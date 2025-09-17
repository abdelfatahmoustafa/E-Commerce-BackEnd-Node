import express from "express";
import * as all from "./category.controller.js";
import upload from "../../services/multer.js";

const routerCategory = express.Router();

const uploadCategoryImage = upload("categories");
routerCategory.get("/", all.getCategories);
routerCategory.post("/", uploadCategoryImage.single("image"), all.addCategory);

export default routerCategory;
