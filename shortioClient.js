// src/shortioClient.js
import axios from "axios";

export async function shortenUrl(originalURL) {
  try {
    const res = await axios.post(
      "https://api.short.io/links",
      {
        domain: process.env.SHORTIO_DOMAIN,
        originalURL,
        allowDuplicates: false
      },
      {
        headers: {
          Authorization: process.env.SHORTIO_KEY,
          "Content-Type": "application/json"
        }
      }
    );
    return res.data.secureShortURL || res.data.shortURL;
  } catch (err) {
    console.error("Short.io error:", err.response?.data || err.message);
    return originalURL; // fallback to original if error
  }
}
