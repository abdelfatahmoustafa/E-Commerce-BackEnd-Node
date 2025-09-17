import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "../db/connection.js";
import routerCategory from "./modules/category-module/category.routes.js";
import handleError from "./middleware/handelError.js";
import subCategoryRouter from "./modules/subCategory-model/subCategory.routes.js";
const app = express();
dotenv.config({ path: path.join(process.cwd(), "config/.env") });
const port = process.env.PORT;
app.use(express.json());
app.use("/api/category", routerCategory);
app.use("/api/category", subCategoryRouter);
connectDB();
app.use(handleError);
app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
