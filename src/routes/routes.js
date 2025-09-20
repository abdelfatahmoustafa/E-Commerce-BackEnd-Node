import brandRouter from "../modules/brand-module/brand.routes.js";
import categoryRouter from "../modules/category-module/category.routes.js";
import productRouter from "../modules/product-module/product.routes.js";
import subCategoryRouter from "../modules/subCategory-model/subCategory.routes.js";
import userRouter from "../modules/user-module/user.routes.js";
import { Router } from "express";
const Routes = Router();

Routes.use("/category", categoryRouter);
Routes.use("/subCategory", subCategoryRouter);
Routes.use("/brand", brandRouter);
Routes.use("/product", productRouter);
Routes.use("/", userRouter);

export default Routes;
