import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "campaign name is required"],
    },
    description: {
      type: String,
      required: [true, "campaign description is required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
    leads: [
      {
        type: String,
      },
    ],
    accountIDs: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Campaign", campaignSchema);
