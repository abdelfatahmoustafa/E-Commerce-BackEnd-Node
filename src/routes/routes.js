import addressRouter from "../modules/address-module/address.routes.js";
import brandRouter from "../modules/brand-module/brand.routes.js";
import categoryRouter from "../modules/category-module/category.routes.js";
import couponRouter from "../modules/coupon-module/coupon.routes.js";
import orderRouter from "../modules/order-module/order.routes.js";
import productRouter from "../modules/product-module/product.routes.js";
import reviewRouter from "../modules/review-module/review.routes.js";
import subCategoryRouter from "../modules/subCategory-model/subCategory.routes.js";
import userRouter from "../modules/user-module/user.routes.js";
import { Router } from "express";
const Routes = Router();

Routes.use("/category", categoryRouter);
Routes.use("/subCategory", subCategoryRouter);
Routes.use("/brand", brandRouter);
Routes.use("/product", productRouter);
Routes.use("/", userRouter);
Routes.use("/address", addressRouter);
Routes.use("/review", reviewRouter);
Routes.use("/order", orderRouter);
Routes.use("/code", couponRouter);

export default Routes;
