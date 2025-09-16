import axios from "axios";

// Calls backend AI endpoint to generate a suggested reply
export async function getAIReply(emailContent: string): Promise<string> {
  try {
    // Replace the URL with your backend endpoint
    const response = await axios.post<{ reply: string }>(
      "http://localhost:5000/api/ai-reply",
      { emailContent }
    );

    return response.data.reply;
  } catch (error) {
    console.error("AI API error:", error);
    throw new Error("Failed to get AI reply");
  }
}
