import express from "express";
import { Client } from "@gradio/client";

const app = express();
const port = process.env.PORT || 3000;

let client;
(async () => {
  try {
    client = await Client.connect("llamameta/Pixtral-Large-Instruct-2411");
    console.log("Connected to Gradio model");
  } catch (err) {
    console.error("Error connecting to Gradio model:", err);
  }
})();

app.get("/chat", async (req, res) => {
  try {
    const {
      message = "Hello!!",
      system_message = "You are a friendly Chatbot created by balianone.com",
      max_tokens = "18000",
      temperature = "0.7",
      top_p = "0.95",
    } = req.query;

    const predictParams = {
      message,
      system_message,
      max_tokens: Number(max_tokens),
      temperature: Number(temperature),
      top_p: Number(top_p),
    };

    const result = await client.predict("/chat", predictParams);
    res.json({ data: result.data });
  } catch (error) {
    console.error("Error during prediction:", error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
