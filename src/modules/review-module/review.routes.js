import {Router} from 'express';
import * as all  from './review.controller.js';

const reviewRouter = Router();

reviewRouter.post("/:userId/:productId", all.addReview);
reviewRouter.get("/:productId", all.getReviewsByProduct);
 
export default reviewRouter;