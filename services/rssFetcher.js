import Parser from "rss-parser";
const parser = new Parser();

export async function fetchFeeds(feedUrls = []) {
  const results = [];
  for (const url of feedUrls) {
    try {
      const feed = await parser.parseURL(url);
      feed.items.forEach(item => {
        results.push({
          title: item.title || "",
          summary: item.contentSnippet || "",
          url: item.link || "",
          date: item.pubDate || "",
          feed: feed.title || ""
        });
      });
    } catch (err) {
      console.error(`RSS fetch failed for ${url}:`, err.message);
    }
  }
  return results;
}
