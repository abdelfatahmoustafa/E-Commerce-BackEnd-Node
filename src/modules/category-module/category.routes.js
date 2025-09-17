import express from "express";
import { addCategory } from "./category.controller.js";
import upload from "../../services/multer.js";

const routerCategory = express.Router();

routerCategory.post("/addCategory", upload.single("image"), addCategory);

export default routerCategory;
