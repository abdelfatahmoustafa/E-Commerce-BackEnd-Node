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
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },
     usedCoupons: [
    {
      couponCode: { type: String, required: true },
      usageCount: { type: Number, default: 0 }
    }
  ],
    isActive: { type: Boolean, required: false, default: false },
    image: [{
      secure_url: { type: String, required: false },
      public_id: { type: String, required: false },
    }],
    cart: { type: Array, required: false, default: [] },
    wishlist: { type: Array, required: false, default: [] },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;



// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },

//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true
//   },

//   password: {
//     type: String,
//     required: true,
//     minlength: 6
//   },

//   phone: {
//     type: String,
//     trim: true
//   },

//   role: {
//     type: String,
//     enum: ['customer', 'seller', 'admin'],
//     default: 'customer'
//   },

//   // 🛒 سلة المستخدم (علاقة One-to-One)
//   cart: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Cart'
//   },

//   // 📦 الطلبات (علاقة One-to-Many)
//   orders: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Order'
//   }],

//   // 🏠 العناوين (علاقة One-to-Many)
//   addresses: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Address'
//   }],

//   // 📝 التقييمات (علاقة One-to-Many)
//   reviews: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Review'
//   }],

//   // 🛍️ المنتجات لو المستخدم بائع (One-to-Many)
//   products: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product'
//   }]

// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);
