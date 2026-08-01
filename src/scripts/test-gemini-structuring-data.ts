import { structureUnstructuredData } from '@/lib/gemini-helper';

async function testGemini() {
  const result = await structureUnstructuredData(
    "Pet ID P-3921, goes by the name Luna, she's about 2 years old.",
    { id: 'string', name: 'string', age: 'string' },
  );
  if (result.success) {
    console.log('Structured Data:', result.data);
  } else {
    console.error('Error structuring data:', result.error);
  }
}

testGemini();
