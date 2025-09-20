import {Router} from "express";
import * as all from "./category.controller.js";
import Upload from "../../services/multer.js";

const categoryRouter = Router();

const uploadCategoryImage = Upload("categories");
categoryRouter.get("/", all.getCategories);
categoryRouter.post("/", uploadCategoryImage.single("img"), all.addCategory);

export default categoryRouter;
