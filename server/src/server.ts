import express, { Response } from "express";
import cors from "cors";
import "dotenv/config";

import { connectDatabase } from "./config/db";
import campaignRoutes from "./routes/campaign.routes";
import messageRoutes from "./routes/message.routes";

const PORT = process.env.PORT || 8080;
const mongodbUrl = process.env.MONGO_URL as string;
const clientUrl = process.env.CLIENT_URL;
const app = express();

// middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: clientUrl,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use("/campaign", campaignRoutes);
app.use("/personalized-message", messageRoutes);
app.get("/health", (_, resp: Response) => {
  resp.status(200).json({
    message: "Server is up and running",
  });
});

app.listen(PORT, () => {
  connectDatabase(mongodbUrl);
  console.log(`Server is running on port ${PORT}`);
});
