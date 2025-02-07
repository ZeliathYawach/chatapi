import { Client } from "@gradio/client";

export async function handler(event, context) {
  try {
    // Extract query parameters; prompt is required.
    const {
      prompt,
      system_message = "You are a friendly Chatbot created by balianone.com",
      max_tokens = "18000",
      temperature = "0.7",
      top_p = "0.95",
    } = event.queryStringParameters || {};

    // Validate that the required 'prompt' parameter is provided.
    if (!prompt) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing required parameter: prompt" }),
      };
    }

    // Map the prompt to the model's expected first argument.
    const message = prompt;

    // Connect to the Gradio model.
    const client = await Client.connect("llamameta/Pixtral-Large-Instruct-2411");

    // Call the predict method using the function index.
    // Adjust fn_index if your chat function is at a different index.
    const result = await client.predict(
      message,
      system_message,
      Number(max_tokens),
      Number(temperature),
      Number(top_p),
      { fn_index: 0 }
    );

    // Return the result as JSON.
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: result }),
    };
  } catch (error) {
    console.error("Error during prediction:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "An error occurred while processing your request",
      }),
    };
  }
}
