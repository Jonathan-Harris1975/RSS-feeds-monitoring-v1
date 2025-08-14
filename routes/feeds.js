// src/routes/feeds.js
import express from "express";
import { processFeedItem } from "../feedsProcessor.js";

const router = express.Router();

router.post("/process-feeds", async (req, res) => {
  try {
    const feeds = req.body;
    if (!Array.isArray(feeds)) {
      return res.status(400).json({ error: "Expected an array of feed items" });
    }

    const results = [];
    for (const feedItem of feeds) {
      try {
        const processed = await processFeedItem(feedItem);
        results.push(processed);
      } catch (err) {
        console.error("Error processing feed item:", err.message);
      }
    }

    res.json(results);
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
