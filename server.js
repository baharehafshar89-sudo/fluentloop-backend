import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// 🧠 system prompt (optional customization)
const systemPrompt = "You are FluentLoop, a helpful and concise assistant.";

// 🟩 Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) return res.json({ reply: "No message provided." });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();
    console.log("🧠 RAW OPENAI RESPONSE:", data);

    if (data.error) {
      console.error("❌ API Error:", data.error);
      return res.json({ reply: "⚠️ OpenAI API error: " + data.error.message });
    }

    if (!data.choices || !data.choices[0]) {
      return res.json({ reply: "⚠️ No choices returned from API." });
    }

    const reply = data.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ error: "Server error." });
  }
});

// 🪶 Root route
app.get("/", (req, res) => {
  res.send("FluentLoop Backend Running ✅");
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen( console.log(`✅ Server running on port ${PORT}`);
});
