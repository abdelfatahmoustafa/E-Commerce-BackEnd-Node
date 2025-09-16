import mongoose from "mongoose";
const { Schema } = mongoose;
const subCategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    slug: { type: String, required: false, unique: true, lowercase: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    imageUrl: {
      secure_url: { type: String, required: false },
      public_id: { type: String, required: false },
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);
export default SubCategoryModel;