import OpenAI from "openai";
import { escapeJson } from "./validators.js";

const client = new OpenAI({
  apiKey: process.env.CHATGPT_KEY
});

export async function rewriteHeadline(title) {
  const prompt = `
Rewrite the provided headline to be natural, concise, and impactful, with a sharp, tech-savvy tone fit for editorial use (e.g., blog or magazine). Avoid clickbait phrasing. Return only the rewritten headline as plain text—no quotes, special characters, formatting, or line breaks. Ensure the output is JSON-safe (escaped if necessary) and can be parsed directly as a string value.

Headline: ${title}
  `;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 100
  });

  return escapeJson(res.choices[0].message.content.trim());
}

export async function rewriteArticle(article) {
  const prompt = `
Rewrite the provided news article in a sharp, conversational Gen X tone—informal, punchy, with varied sentence lengths. Use only factual content from the article. Ignore and exclude any promotional, subscription, donation, newsletter, follow-us, "read more", author bio, or unrelated call-to-action text. Do not add new details, opinions, controversial topics, political figures, geopolitical references, or direct quotations. Keep it neutral and free of sensitive keywords. Output as a single continuous string of plain text with no line breaks, paragraphs, or [newline] markers. Escape JSON-sensitive characters by replacing \\" with \\\\\\" and \` with \\\\. No extra spaces, tabs, or formatting outside the text content.

Article: ${article}
  `;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 1500
  });

  return escapeJson(res.choices[0].message.content.trim());
}

export async function detectAILikelihood(text) {
  const prompt = `
Rate how likely it is that this text was AI-generated, expressed as a percentage from 0 (definitely human) to 100 (definitely AI-generated).
Only reply with a single number, no words or explanations.

Text: ${text}
  `;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
    max_tokens: 5
  });

  const score = parseInt(res.choices[0].message.content.trim(), 10);
  return isNaN(score) ? null : score;
}
