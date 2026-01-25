import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

// convert file to Base64
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
  });
}

// Analyze image with Gemini
export async function analyzeStrayImage(imageBase64: string, mimeType: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview',
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

    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);

    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      animalType: 'unknown',
      animalCount: 1,
      visibleIssues: ['Unable to analyze'],
      environment: 'unknown',
      urgency: 'Medium' as const,
      description: 'Analysis failed',
    };
  }
}
