app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
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
    console.log("🧩 OpenAI response:", data); // ← اضافه کن برای بررسی خروجی

    if (!data.choices || !data.choices[0]) {
      return res.json({ reply: "⚠️ API response was invalid or empty." });
    }

    const reply = data.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error("❌ Error during chat:", error);
    res.status(500).json({ error: "Server error" });
  }
});
