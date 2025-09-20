import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "../db/connection.js";
import handleError from "./middleware/handelError.js";
import Routes from "./routes/routes.js";
const app = express();
dotenv.config({ path: path.join(process.cwd(), "config/.env") });
const port = process.env.PORT;
app.use(express.json());
app.use("/api", Routes);
connectDB();
app.use(handleError);
app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
