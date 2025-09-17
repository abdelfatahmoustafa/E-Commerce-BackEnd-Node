import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
      console.log("Database connected successfully with mongoose")
    })
  } catch (error) {
    console.log("error in data connection", error);
  }
};

export default connectDB;
