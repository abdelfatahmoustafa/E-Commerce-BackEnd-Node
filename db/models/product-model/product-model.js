import mongoose from "mongoose";
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    name: { type: String, required: true, lowercase: true },
    slug: { type: String, required: true, lowercase: true },
    description: { type: String, required: false, default: "" },
    price: { type: Number, required: false, default: 0 },
    quantity: { type: Number, required: false, default: 0 },
    sold: { type: Number, default: 0 },
    image: [
      {
        secure_url: { type: String, required: false },
        public_id: { type: String, required: false },
      },
    ],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: false },
    colors: [{ type: String, required: false }],
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
