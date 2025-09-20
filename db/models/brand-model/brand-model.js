import mongoose from "mongoose";
const { Schema } = mongoose;
const brandSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true },
    slug: { type: String, required: false, unique: true, lowercase: true },
    description: { type: String, required: false },
    logo: {
      secure_url: { type: String, required: false },
      public_id: { type: String, required: false },
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: false },
    subCategoryID: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    
  },
  { timestamps: true }
);
const BrandModel = mongoose.model("Brand", brandSchema);
export default BrandModel;
