
import * as all from "./user.controller.js";
import { Router } from "express";
const  userRouter = Router();

userRouter.post("/signup", all.signUp);
userRouter.get("/signin", all.logIn);

export default userRouter;