import e from "express";
import { Schema, model } from "mongoose";

const addressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    label: { type: String ,default:""}, // e.g., "Home", "Work"
    street: { type: String, required: false ,default:""},
    city: { type: String, required: false ,default:""},
    state: { type: String ,default:""},
    country: { type: String, required: false ,default:""},
    zipCode: { type: String,default:"" },
    phone: { type: String,default:"" },
  },
  { timestamps: true }
);

const AddressModel = model("Address", addressSchema);
export default AddressModel;




