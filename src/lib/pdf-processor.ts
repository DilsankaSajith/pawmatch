import { getDocument } from 'pdfjs-dist';

export const PET_FORMAT = {
  name: 'string',
  age: 'string',
  breed: 'string',
  gender: 'enum',
  description: 'string',
  address: 'string',
  animalType: 'enum',
  lastVaccinatedDate: 'date',
  healthCondition: 'enum',
};

export async function extractTextFromPDF(
  pdfBuffer: ArrayBuffer,
): Promise<string> {
  try {
    const pdf = await getDocument({ data: pdfBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error('PDF Extraction Error:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export function splitPetEntries(text: string): string[] {
  // Split by double newline or bullet points
  const entries = text
    .split(/\n\s*\n|•|\d+\.\s*/)
    .filter((entry) => entry.trim().length > 50);
  return entries.length > 0 ? entries : [text];
}

export async function processPetEntries(
  entries: string[],
  format: Record<string, string> = PET_FORMAT,
) {
  const results = [];

  for (const entry of entries) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/structured-data`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: entry,
            format: format,
          }),
        },
      );

      if (!response.ok) {
        console.warn(`Failed to process entry: ${response.status}`);
        continue;
      }

      const result = await response.json();

      if (result.success) {
        results.push(result.data);
      }
    } catch (error) {
      console.error('Error processing entry:', error);
    }
  }

  return results;
}

export async function processPDF(
  file: File,
  format: Record<string, string> = PET_FORMAT,
) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const text = await extractTextFromPDF(arrayBuffer);
    const entries = splitPetEntries(text);
    const structuredData = await processPetEntries(entries, format);

    return {
      success: true,
      entries: entries.length,
      data: structuredData,
      rawText: text,
    };
  } catch (error) {
    console.error('PDF Processing Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process PDF',
    };
  }
}
