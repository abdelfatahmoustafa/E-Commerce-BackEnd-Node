import { Router } from "express";
import * as all from "./brand.controller.js";
import Upload from "../../services/multer.js";

const brandRouter = Router();
const uploadBrandImage = Upload("categories/subCategories/brands");
brandRouter.get("/",  all.getBrands);
brandRouter.post("/", uploadBrandImage.single("img"), all.addBrand);

export default brandRouter;
