// Vercel serverless function. Ưu tiên Gemini (miễn phí) nếu có GEMINI_API_KEY, nếu không dùng Anthropic.
module.exports = async function (req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  const prompt = String((b && b.prompt) || "").slice(0, 6000);
  if (!prompt) return res.status(400).json({ error: "empty prompt" });
  try {
    let text;
    if (process.env.GEMINI_API_KEY) {
      const model = process.env.GEMINI_MODEL || "gemini-flash-latest"; // nên đổi thành model ID copy từ AI Studio
      const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent", {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 400 } })
      });
      const j = await r.json();
      const p = j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts;
      text = p && p[0] && p[0].text;
    } else if (process.env.ANTHROPIC_API_KEY) {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: process.env.MODEL || "claude-haiku-5-5", max_tokens: 300, messages: [{ role: "user", content: prompt }] })
      });
      const j = await r.json();
      text = j.content && j.content[0] && j.content[0].text;
    } else {
      return res.status(500).json({ error: "missing API key" });
    }
    if (!text) return res.status(502).json({ error: "upstream error" });
    return res.status(200).json({ text: text });
  } catch (e) {
    return res.status(502).json({ error: "request failed" });
  }
};
