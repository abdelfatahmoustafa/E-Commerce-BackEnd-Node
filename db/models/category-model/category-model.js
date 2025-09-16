import mongoose from "mongoose";
const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    slug: { type: String, required: false, unique: true, lowercase: true },
    description: { type: String, required: true },
    imageUrl: {
      secure_url: { type: String, required: false },
      public_id: { type: String, required: false },
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;
