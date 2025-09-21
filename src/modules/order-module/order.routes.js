
import { Router } from "express";
import  * as all from "./order.controller.js";
const orderRouter = Router();

orderRouter.post("/", all.makeOrder);
orderRouter.get("/", all.getAllOrders);
orderRouter.get("/:userId", all.getOrderByUserId);

export default orderRouter;