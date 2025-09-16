
import mongoose from "mongoose";
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    imageUrls: [
      {
        secure_url: { type: String, required: false },
        public_id: { type: String, required: false },
      },
    ],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: false,
    },
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    colors: [{ type: String, required: false }],
 
  },
  { timestamps: true }
);
const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;