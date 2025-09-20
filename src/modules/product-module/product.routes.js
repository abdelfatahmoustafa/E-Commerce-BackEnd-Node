
import { Router } from "express";
import * as all from "./product.controller.js";
import Upload from "../../services/multer.js";
const productRouter = Router();
const uploadProductImage = Upload("products");
productRouter.post("/",uploadProductImage.single("img"), all.addProduct);
productRouter.get("/", all.getAllProducts);
productRouter.get("/:id", all.getSingleProduct);


export default productRouter;