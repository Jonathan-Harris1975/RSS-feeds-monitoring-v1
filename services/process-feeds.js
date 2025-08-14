import express from "express";
import { fetchFeeds } from "../services/rssFetcher.js";
import { processFeedItem } from "../services/feedsProcessor.js";

const router = express.Router();

// Feed URLs — can be stored in env or config file
const FEED_URLS = [
  "https://example.com/rss",
  "https://another-source.com/rss"
];

router.get("/process-feeds", async (req, res) => {
  try {
    const rawFeeds = await fetchFeeds(FEED_URLS);

    const results = [];
    for (const item of rawFeeds) {
      try {
        const processed = await processFeedItem(item);
        results.push(processed);
      } catch (err) {
        console.error("Processing error:", err.message);
      }
    }

    res.json(results);
  } catch (err) {
    console.error("Route error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
