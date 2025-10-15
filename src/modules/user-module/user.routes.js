import * as all from "./user.controller.js";
import { Router } from "express";
const userRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *         phone:
 *           type: string
 *           description: The user phone number
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: The user role
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was created
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication and management API
 */

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - Email already exists
 */

userRouter.post("/signup", all.signUp);

/**
 * @swagger
 * /api/signin:
 *   get:
 *     summary: Sign in user
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: User email
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: User password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 */
userRouter.get("/signin", all.logIn);

export default userRouter;
