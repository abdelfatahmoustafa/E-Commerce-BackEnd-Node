import * as all from "./coupon.controller.js";
import { Router } from "express";
const couponRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: Discount and promotional codes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Coupon:
 *       type: object
 *       properties:
 *         couponCode:
 *           type: string
 *         discountType:
 *           type: string
 *           enum: [percentage, fixed]
 *         discountAmount:
 *           type: number
 *         minimumOrderAmount:
 *           type: number
 *         maximumDiscountAmount:
 *           type: number
 *         totalUsageLimit:
 *           type: number
 *         userUsageLimit:
 *           type: number
 *         validFrom:
 *           type: string
 *           format: date-time
 *         validUntil:
 *           type: string
 *           format: date-time
 *         isActive:
 *           type: boolean
 */

/**
 * @swagger
 * /api/code/generateCode:
 *   post:
 *     summary: Generate a new coupon code
 *     tags: [Coupons]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       201:
 *         description: Coupon code generated successfully
 */
couponRouter.post("/generateCode", all.generateCouponCode);

/**
 * @swagger
 * /api/code/applyCoupon:
 *   post:
 *     summary: Apply a coupon to an order total
 *     tags: [Coupons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [couponCode, userId, totalPrice]
 *             properties:
 *               couponCode:
 *                 type: string
 *               userId:
 *                 type: string
 *               totalPrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Coupon applied successfully
 */
couponRouter.post("/applyCoupon", all.applyCoupon);

/**
 * @swagger
 * /api/code/editCoupon/{couponCode}:
 *   post:
 *     summary: Edit coupon applicability and status
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: couponCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The coupon code to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *               user:
 *                 type: array
 *                 items:
 *                   type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 */
couponRouter.post("/editCoupon/:couponCode", all.couponEdit);
export default couponRouter;
