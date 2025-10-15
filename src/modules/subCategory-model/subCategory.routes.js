import express from "express";
import * as all from "./subCategory.controller.js";
import Upload from "../../services/multer.js";
const subCategoryRouter = express.Router();

const uploadSubCategoryImage = Upload("categories/subCategories");

// Get all sub-categories

/**
 * @swagger
 * components:
 *   schemas:
 *     SubCategory:
 *       type: object
 *       required:
 *         - name
 *         - categoryID
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the sub-category
 *         name:
 *           type: string
 *           description: The sub-category name
 *         categoryID:
 *           type: string
 *           description: The ID of the parent category
 *         img:
 *           type: string
 *           description: The sub-category image URL
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the sub-category was created
 */
/**
 * @swagger
 * tags:
 *   name: SubCategories
 *   description: The sub-categories managing API
 */

/**
 * @swagger
 * /api/subCategory:
 *   get:
 *     summary: Get all sub-categories
 *     tags: [SubCategories]
 *     responses:
 *       200:
 *         description: List of all sub-categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubCategory'
 */
subCategoryRouter.get("/", all.getSubCategories);

// Get sub-category by ID

/**
 * @swagger
 * /api/subCategory/{id}:
 *   get:
 *     summary: Get a sub-category by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The sub-category ID
 *     responses:
 *       200:
 *         description: The sub-category description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       404:
 *         description: Sub-category not found
 */
subCategoryRouter.get("/:id", all.getSubCategoryById);

// Add new sub-category

/**
 * @swagger
 * /api/subCategory:
 *   post:
 *     summary: Create a new sub-category
 *     tags: [SubCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - categoryID
 *               - img
 *             properties:
 *               name:
 *                 type: string
 *                 description: The sub-category name
 *               categoryID:
 *                 type: string
 *                 description: The ID of the parent category
 *               img:
 *                 type: string
 *                 format: binary
 *                 description: The sub-category image file
 *     responses:
 *       201:
 *         description: The sub-category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Bad request
 */
subCategoryRouter.post(
  "/",
  uploadSubCategoryImage.single("img"),
  all.addSubCategory
);

//Update sub-category by ID

/**
 * @swagger
 * /api/subCategory/{id}:
 *   put:
 *     summary: Update a sub-category by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The sub-category ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The sub-category name
 *               categoryID:
 *                 type: string
 *                 description: The ID of the parent category
 *               img:
 *                 type: string
 *                 format: binary
 *                 description: The sub-category image file
 *     responses:
 *       200:
 *         description: The sub-category was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Sub-category not found
 */
subCategoryRouter.put(
  "/:id",
  uploadSubCategoryImage.single("img"),
  all.updateSubCategoryById
);

// Delete sub-category by ID

/**
 * @swagger
 * /api/subCategory/{id}:
 *   delete:
 *     summary: Delete a sub-category by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The sub-category ID
 *     responses:
 *       200:
 *         description: The sub-category was successfully deleted
 *       404:
 *         description: Sub-category not found
 */
subCategoryRouter.delete("/:id", all.deleteSubCategoryById);

export default subCategoryRouter;
