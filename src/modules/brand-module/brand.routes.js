import { Router } from "express";
import * as all from "./brand.controller.js";
import Upload from "../../services/multer.js";

const brandRouter = Router();
const uploadBrandImage = Upload("categories/subCategories/brands");

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the brand
 *         name:
 *           type: string
 *           description: The brand name
 *         img:
 *           type: string
 *           description: The brand image URL
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the brand was created
 */

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Brand management API
 */

//get all brands

/**
 * @swagger
 * /api/brand:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of all brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 */
brandRouter.get("/", all.getBrands);

// get brand by id

/**
 * @swagger
 * /api/brand/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The brand ID
 *     responses:
 *       200:
 *         description: Brand found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Brand not found
 */
brandRouter.get("/:id", all.getBrandById);

/**
 * @swagger
 * /api/brand:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Brand created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Bad request
 */
brandRouter.post("/", uploadBrandImage.single("img"), all.addBrand);

// update brand by id

/**
 * @swagger
 * /api/brand/{id}:
 *   put:
 *     summary: Update a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The brand ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Brand updated successfully
 */
brandRouter.put("/:id", uploadBrandImage.single("img"), all.updateBrand);

// delete brand by id

/**
 * @swagger
 * /api/brand/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The brand ID
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 */
brandRouter.delete("/:id", all.deleteBrand);

export default brandRouter;
