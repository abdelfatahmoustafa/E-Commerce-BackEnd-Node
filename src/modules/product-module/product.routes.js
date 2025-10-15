import { Router } from "express";
import * as all from "./product.controller.js";
import Upload from "../../services/multer.js";
const productRouter = Router();
const uploadProductImage = Upload("products");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         title:
 *           type: string
 *           description: The product title
 *         description:
 *           type: string
 *           description: The product description
 *         price:
 *           type: number
 *           description: The product price
 *         priceAfterDiscount:
 *           type: number
 *           description: The product price after discount
 *         quantity:
 *           type: number
 *           description: The product quantity in stock
 *         sold:
 *           type: number
 *           description: The number of products sold
 *         img:
 *           type: string
 *           description: The product image URL
 *         category:
 *           type: string
 *           description: The product category ID
 *         subCategory:
 *           type: string
 *           description: The product subcategory ID
 *         brand:
 *           type: string
 *           description: The product brand ID
 *         rateAvg:
 *           type: number
 *           description: The average rating of the product
 *         rateCount:
 *           type: number
 *           description: The number of ratings
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               category:
 *                 type: string
 *               subCategory:
 *                 type: string
 *               brand:
 *                 type: string
 *               img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productRouter.post("/", uploadProductImage.single("img"), all.addProduct);

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productRouter.get("/", all.getAllProducts);

/**
 * @swagger
 * /api/product/pagination:
 *   get:
 *     summary: Get products with pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: Paginated list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   type: object
 */
productRouter.get("/pagination", all.getLimitProduct);

/**
 * @swagger
 * /api/product/searchProduct:
 *   get:
 *     summary: Search products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword
 *     responses:
 *       200:
 *         description: List of matching products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productRouter.get("/searchProduct", all.searchProduct);

export default productRouter;
