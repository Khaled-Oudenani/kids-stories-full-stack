import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to database");
    });

    const conn = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
