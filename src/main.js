import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "../db/connection.js";
const app = express();
dotenv.config({ path: path.resolve("../config/.env") });
app.use(express.json());
const port = process.env.PORT;
connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
