import express from "express";
import dotenv from "dotenv";
import processFeedsRoute from "./src/routes/process-feeds.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "2mb" }));

app.use("/", processFeedsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
