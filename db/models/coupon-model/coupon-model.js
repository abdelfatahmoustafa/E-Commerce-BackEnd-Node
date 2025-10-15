import { Schema, model } from "mongoose";

const couponSchema = new Schema({
  couponCode: { type: String, required: true, unique: true }, 
  discountType: { type: String, enum: ["percentage", "fixed"], required: true }, 
  discountAmount: { type: Number, required: true }, 

  minimumOrderAmount: { type: Number, default: 0 }, 
  maximumDiscountAmount: { type: Number }, 

  totalUsageLimit: { type: Number, default: 1 }, 
  userUsageLimit: { type: Number, default: 0 }, 

  startDate: { type: Date, default: Date.now }, 
  expiryDate: { type: Date }, 

  isActive: { type: Boolean, default: true }, 

  applicableTo: {
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    users: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },

  createdByAdmin: { type: Schema.Types.ObjectId, ref: "Admin" }

}, { timestamps: true });

const couponModel= model("Coupon", couponSchema);

export default couponModel;

 