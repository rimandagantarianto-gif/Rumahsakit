import { GoogleGenAI } from "@google/genai";

// Initialize the client. 
// NOTE: In a real Vercel deployment, strictly ensure process.env.API_KEY is defined in Vercel project settings.
// This code assumes the key is present as per instructions.
const apiKey = process.env.API_KEY || 'YOUR_API_KEY_HERE_FOR_LOCAL_DEV'; 
const ai = new GoogleGenAI({ apiKey: apiKey });

const MODEL_ID = "gemini-2.5-flash";

export const generateMedicalSummary = async (patientData: string, query: string) => {
  try {
    const systemInstruction = `
      You are SCHOA (Smart Clinical & Operational Assistant), a highly advanced medical assistant AI.
      
      Your Role:
      1. Assist healthcare professionals by summarizing patient data (simulated FHIR records).
      2. Draft clinical documentation (SOAP notes, After Visit Summaries).
      3. Provide operational insights based on financial data provided in context.

      Constraints:
      - DO NOT provide definitive medical diagnoses. You are a support tool.
      - ALWAYS include a disclaimer if the user asks for treatment advice.
      - Keep responses professional, concise, and structured (markdown).
      - If asked about billing/operations, focus on efficiency and data accuracy.
    `;

    const prompt = `
      Context Data (Patient/Operational Record):
      ${patientData}

      User Query:
      ${query}
    `;

    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2, // Low temperature for factual consistency
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating response. Please check your API key and connection.";
  }
};