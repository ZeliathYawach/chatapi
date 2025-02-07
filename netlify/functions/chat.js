import { Client } from "@gradio/client";

export async function handler(event, context) {
  try {
    const { 
      prompt, 
      max_tokens = "18000", 
      temperature = "0.7", 
      top_p = "0.95" 
    } = event.queryStringParameters || {};

    if (!prompt) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing required parameter: prompt" }),
      };
    }

    // Connect to Gradio app
    const client = await Client.connect("llamameta/Pixtral-Large-Instruct-2411");
    
    // Get API info to verify endpoints (optional debugging step)
    // const app_info = await client.view_api();
    // console.log("API Info:", app_info);

    // Corrected predict call with proper parameters and fn_index
    const result = await client.predict(
      prompt, 
      Number(max_tokens), 
      Number(temperature), 
      Number(top_p),
      { 
        fn_index: 0 // Most likely correct index for text generation
      }
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: result }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Failed to process request. Please check your parameters.",
      }),
    };
  }
}
