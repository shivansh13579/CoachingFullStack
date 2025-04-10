import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    if (connection) {
      console.log("Mongodb Connected sussfully");
    }
  } catch (error) {
    console.error("Connection failed", error.message);
    process.exit(1);
  }
};

export default dbConnection;
