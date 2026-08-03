"use server";

import { AllowedType } from "@/app/api/struct-data/types";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function structureUnstructuredData(
  text: string,
  format: Record<string, AllowedType>,
) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });
    const formatDescription = Object.entries(format)
      .map(([key, type]) => `  "${key}": "${type}"`)
      .join(",\n");

    const prompt = `You are a data extraction AI. Extract information from the given text and structure it according to the provided format.

TEXT TO STRUCTURE:
"${text}"

REQUIRED FORMAT:
{
${formatDescription}
}

INSTRUCTIONS:
1. Extract information from the text that matches each field
2. Field types: 
   - "string": any text value
   - "number": numeric values
   - "boolean": true/false values
   - "date": dates in YYYY-MM-DD format
   - "enum": one of a set of predefined values (infer from context)
3. If a field cannot be found, use null
4. For dates, format as YYYY-MM-DD
5. Return ONLY valid JSON matching the format structure
6. Do not include any explanatory text, just the JSON
7. For enum values, use uppercase for the first letter of each word and others lowercase. (e.g: Female, Male)

Return the extracted data as JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = await response.text();

    // Extract JSON from response
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }

    const parsedData = JSON.parse(jsonMatch[0]);

    return {
      success: true,
      data: parsedData,
      rawResponse: textResponse,
    };
  } catch (error) {
    console.error("Structuring Data Error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to structure data",
      rawResponse: null,
    };
  }
}

// convert file to Base64
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
  });
}

// Analyze image with Gemini
export async function analyzeStrayImage(imageBase64: string, mimeType: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });
    const prompt = `
      You are analyzing animal photos for a stray rescue platform in Sri Lanka.
      
      Look at this image and provide:
      1. Animal type (dog, cat, etc.)
      2. Estimated count
      3. Visible health issues
      4. Environment safety
      5. Urgency level: "Low", "Medium", "High", or "Urgent"
      
      Return ONLY valid JSON format:
      {
        "animalType": string,
        "animalCount": number,
        "visibleIssues": string[],
        "environment": string,
        "urgency": "Low" | "Medium" | "High" | "Urgent",
        "description": string
      }
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      animalType: "unknown",
      animalCount: 1,
      visibleIssues: ["Unable to analyze"],
      environment: "unknown",
      urgency: "Medium" as const,
      description: "Analysis failed",
    };
  }
}
