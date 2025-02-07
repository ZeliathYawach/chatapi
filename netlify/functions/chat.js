import { Client } from "@gradio/client";

export async function handler(event, context) {
  try {
    // Extract the prompt from query parameters.
    const { prompt } = event.queryStringParameters || {};
    if (!prompt) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing required parameter: prompt" }),
      };
    }

    // Define additional parameters.
    // Adjust these values as needed or extract from query parameters.
    const system_message = "you are a chat bot"; // Or use another default system message.
    const max_tokens = 1;
    const temperature = 0.1;
    const top_p = 0.1;

    // Connect to your Gradio model.
    const client = await Client.connect("llamameta/Pixtral-Large-Instruct-2411");

    // Call predict with the expected parameters.
    // Make sure the ordering matches your Gradio interface.
    const result = await client.predict(
      prompt,          // The input prompt (message)
      system_message,  // The system message
      max_tokens,      // Maximum tokens
      temperature,     // Temperature
      top_p,           // Top-p value
      { fn_index: 0 }  // Use the correct endpoint index (adjust if necessary)
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: result.data }),
    };
  } catch (error) {
    console.error("Error during prediction:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message }),
    };
  }
}
