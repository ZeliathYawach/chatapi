import { Client } from "@gradio/client";

export async function handler(event, context) {
  try {
    // Extract parameters from the query string.
    const {
      prompt,
      max_tokens = "18000",
      temperature = "0.7",
      top_p = "0.95"
    } = event.queryStringParameters || {};

    // Validate the required prompt parameter.
    if (!prompt) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing required parameter: prompt" }),
      };
    }

    // Use a hard-coded system message.
    const system_message = "You are a friendly Chatbot created by balianone.com";

    // Connect to your Gradio model.
    const client = await Client.connect("llamameta/Pixtral-Large-Instruct-2411");

    // Call the predict method with the proper parameters.
    // Change the fn_index if necessary. Here we're using fn_index: 0.
    const result = await client.predict(
      prompt,
      system_message,
      Number(max_tokens),
      Number(temperature),
      Number(top_p),
      { fn_index: 0 } // Use 0 if that is the correct endpoint; adjust if needed.
    );

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
        error: "An error occurred while processing your request"
      }),
    };
  }
}
