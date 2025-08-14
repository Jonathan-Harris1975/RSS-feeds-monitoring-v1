// src/feedsProcessor.js
import { rewriteHeadline, rewriteArticle, detectAILikelihood } from "./gptClient.js";
import { shortenUrl } from "./shortioClient.js";
import { isPlainText } from "./validators.js";

export async function processFeedItem(feedItem) {
  const { title, summary, url, date, feed } = feedItem;

  const rewritten_title = await rewriteHeadline(title);
  const rewritten_text = await rewriteArticle(summary);
  const detection_score = await detectAILikelihood(rewritten_text);

  if (!isPlainText(rewritten_text) || !isPlainText(rewritten_title)) {
    throw new Error("Validation failed: Output contains line breaks or tabs");
  }

  const short_url = await shortenUrl(url);

  return {
    original: {
      title,
      summary,
      url,
      date
    },
    processed: {
      rewritten_title,
      rewritten_text,
      timestamp: new Date().toISOString(),
      original_feed_ref: feed || null,
      detection_score,
      short_url
    }
  };
}
