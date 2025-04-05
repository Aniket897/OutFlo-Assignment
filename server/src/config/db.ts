import mongoose from "mongoose";

export const connectDatabase = (MongoUrl: string) => {
  mongoose
    .connect(MongoUrl, {
      dbName: "outflo-assignment",
    })
    .then(() => {
      console.log("Mongodb connected successfully");
    })
    .catch((e) => {
      console.log("Failed to connect Mongodb", e);
      process.exit(1);
    });
};
