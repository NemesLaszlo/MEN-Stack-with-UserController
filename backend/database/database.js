import mongoose from "mongoose";
import {successLogger, errorLogger} from "../utils/logger.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Connected to MongoDB! (${conn.connection.host})`);
    successLogger.info(`Connected to MongoDB! (${conn.connection.host})`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    errorLogger.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
