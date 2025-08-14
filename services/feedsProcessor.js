import { rewriteHeadline, rewriteArticle, detectAILikelihood } from "./gptClient.js";
import { shortenUrl } from "./shortioClient.js";
import { isPlainText } from "./validators.js";

export async function processFeedItem(item) {
  const { title, summary, url, date, feed } = item;

  const rewritten_title = await rewriteHeadline(title);
  const rewritten_text = await rewriteArticle(summary);
  const detection_score = await detectAILikelihood(rewritten_text);

  if (!isPlainText(rewritten_title) || !isPlainText(rewritten_text)) {
    throw new Error("Validation failed: Output contains line breaks or tabs");
  }

  const short_url = await shortenUrl(url);

  return {
    original: { title, summary, url, date },
    processed: {
      rewritten_title,
      rewritten_text,
      timestamp: new Date().toISOString(),
      original_feed_ref: feed,
      detection_score,
      short_url
    }
  };
}
