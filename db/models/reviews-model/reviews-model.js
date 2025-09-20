import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, min: 1, max: 5 ,default: 1 },
    comment: {type: String  ,default: "" }
  },
  { timestamps: true }
);
const ReviewModel = model("Review", reviewSchema);
export default ReviewModel;
