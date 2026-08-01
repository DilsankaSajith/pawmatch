// test-service.ts
import { processStructuredData } from '@/app/api/struct-data/services';

async function testService() {
  const result = await processStructuredData(
    'Luna is a 2-year-old Siberian Husky, female, very playful',
    {
      name: 'string',
      age: 'string',
      breed: 'string',
      gender: 'enum',
    },
  );
  console.log('Service Result:', result);
}

testService();
