import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false, default: "" },
    address: { type: String, required: false, default: "" },
    dateOfBirth: { type: String, required: false, default: "" },
    gender: { type: String, required: false, default: "" },
    role: { type: String, required: true, default: "customer" },
    isActive: { type: Boolean, required: true, default: true },
    avatar: { type: String, required: false, default: "" },
    cart: { type: Array, required: false, default: [] },
    wishlist: { type: Array, required: false, default: [] },
    
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
