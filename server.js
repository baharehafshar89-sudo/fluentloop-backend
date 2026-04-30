import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static("public"));

// Simple root check
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are FluentLoop AI — a helpful assistant." },
          { role: "user", content: message }
        ]
      }),
    });

    const data = await response.json();
    console.log("🧠 RAW OPENAI:", data);

    const ai = data.choices?.[0]?.message?.content || "No response.";

    res.json({ reply: ai });

  } catch (err) {
    console.error("❌ CHAT ERROR:", err);
    res.status(500).json({ reply: "Server error." });
  }
});

// Render port system
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 Server running on port " + PORT));
