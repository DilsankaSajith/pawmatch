import { searchPetsBySemantic } from '@/app/dashboard/search-actions';

async function testSearch() {
  console.log('🔍 Testing semantic search...\n');

  console.log('📝 Test 1: Search for "friendly dog that loves kids"');
  const results = await searchPetsBySemantic('friendly dog that loves kids');

  console.log(`✅ Found ${results.length} matching pets\n`);

  if (results.length > 0) {
    results.slice(0, 3).forEach((pet: any, index: number) => {
      console.log(
        `${index + 1}. ${pet.name} (Similarity: ${pet.similarity?.toFixed(3)})`,
      );
      console.log(`   ${pet.description.substring(0, 100)}...\n`);
    });
  }
}

testSearch();
