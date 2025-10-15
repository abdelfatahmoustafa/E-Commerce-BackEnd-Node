import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "../db/connection.js";
import handleError from "./middleware/handelError.js";
import Routes from "./routes/routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";
import logger from "./utils/logger.js";
const app = express();
logger.info("🚀 Logger is working Now");

dotenv.config({ path: path.join(process.cwd(), "../config/.env") });
const port = process.env.PORT;

// CORS middleware
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With"
//   );

//   if (req.method === "OPTIONS") {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });

app.use(
  cors({
    origin: ["http://localhost:3000", "https://myfrontend.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
// Basic health check route
app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce API is running successfully!",
    timestamp: new Date().toISOString(),
    endpoints: {
      "API Documentation": "/api-docs",
      Categories: "/api/category",
      Products: "/api/product",
      Users: "/api/user",
      Brands: "/api/brand",
    },
  });
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "REST API for an E-Commerce application",
    },

    tags: [
      { name: "Users", description: "User authentication and management" },
      { name: "Categories", description: "Main product categories" },
      {
        name: "SubCategories",
        description: "Nested subcategories under main categories",
      },
      { name: "Brands", description: "Brands and manufacturers" },
      { name: "Products", description: "All products in the store" },
      { name: "Orders", description: "Customer orders and checkout" },
      { name: "Coupons", description: "Discount and promotional codes" },
      { name: "Addresses", description: "User shipping addresses" },
      { name: "Reviews", description: "Customer feedback and product reviews" },
    ],
  },

  apis: [
    path.join(process.cwd(), "src/routes/routes.js"),
    path.join(process.cwd(), "src/modules/user-module/user.routes.js"),
    path.join(process.cwd(), "src/modules/category-module/category.routes.js"),
    path.join(
      process.cwd(),
      "src/modules/subCategory-model/subCategory.routes.js"
    ),
    path.join(process.cwd(), "src/modules/brand-module/brand.routes.js"),
    path.join(process.cwd(), "src/modules/product-module/product.routes.js"),
    path.join(process.cwd(), "src/modules/order-module/order.routes.js"),
    path.join(process.cwd(), "src/modules/coupon-module/coupon.routes.js"),
    path.join(process.cwd(), "src/modules/address-module/address.routes.js"),
    path.join(process.cwd(), "src/modules/review-module/review.routes.js"),
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", Routes);

// Handle 404 - Route not found
app.use((req, res, next) => {
  return next(new Error(`Route ${req.originalUrl} not found`));
});

// Error handler should be AFTER all routes
app.use(handleError);

connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
