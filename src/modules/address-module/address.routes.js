import { Router } from "express";
import * as all from "./address.controller.js";
const addressRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: User shipping addresses
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         label:
 *           type: string
 *         street:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         country:
 *           type: string
 *         zipCode:
 *           type: string
 *         phone:
 *           type: string
 */

/**
 * @swagger
 * /api/address/{userId}:
 *   post:
 *     summary: Add an address for a user
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address added successfully
 */
addressRouter.post("/:userId", all.addAddress);

/**
 * @swagger
 * /api/address/{userId}:
 *   get:
 *     summary: Get all addresses for a user
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of addresses for the user
 */
addressRouter.get("/:userId", all.getUserAddresses);

export default addressRouter;
