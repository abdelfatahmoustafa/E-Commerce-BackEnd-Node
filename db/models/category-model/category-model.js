import mongoose from "mongoose";
const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    slug: { type: String, required: false, unique: true, lowercase: true },
    description: { type: String, required: false },
    image: {
      secure_url: { type: String, required: false },
      public_id: { type: String, required: false },
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: false },
    customID: { type: String, required: false, unique: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

categorySchema.virtual("subCategories", {
  ref: "SubCategory",
  localField: "_id",
  foreignField: "category",
});
const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;
