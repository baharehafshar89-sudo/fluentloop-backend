import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
  try {

    const { message } = req.body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            { role: "user", content: message }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("🧠 GROQ RESPONSE:", data);

    const reply = data.choices?.[0]?.message?.content || "No response";

    res.json({ reply });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.json({ reply: "Server error" });
  }
});

app.listen(process.env.PORT || 10000, () => {
  console.log("🚀 FluentLoop server running");
});
