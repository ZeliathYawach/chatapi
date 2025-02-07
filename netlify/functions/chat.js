import { Client } from "@gradio/client";

export async function handler(event, context) {
  try {
    // Extract query parameters (if none provided, use defaults)
    const {
      message = "Hello!!",
      system_message = "Hello!!",
      max_tokens = "1",
      temperature = "0.1",
      top_p = "0.1",
    } = event.queryStringParameters || {};

    // Convert numeric values to numbers
    const predictParams = {
      message,
      system_message,
      max_tokens: Number(max_tokens),
      temperature: Number(temperature),
      top_p: Number(top_p),
    };

    // Connect to your Gradio model
    const client = await Client.connect("llamameta/Pixtral-Large-Instruct-2411");

    // Call the Gradio predict method on the "/chat" endpoint
    const result = await client.predict("/chat", predictParams);

    return {
      statusCode: 200,
      body: JSON.stringify({ data: result.data }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    console.error("Error during prediction:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred while processing your request" }),
      headers: { "Content-Type": "application/json" },
    };
  }
}
