import { intentionRepository } from './intentionRepository';

// Test the repository functions
async function testRepository() {
  console.log('Testing Intention Repository...');

  // Test get intention
  const currentIntention = await intentionRepository.getIntention();
  console.log('Current intention:', currentIntention);

  // Test save intention
  await intentionRepository.saveIntention({
    text: 'Stay focused today',
    mood: 'blue'
  });

  // Test get updated intention
  const updatedIntention = await intentionRepository.getIntention();
  console.log('Updated intention:', updatedIntention);

  // Clear for next test
  await intentionRepository.clearIntention();
  const cleared = await intentionRepository.getIntention();
  console.log('After clear:', cleared);
}

// Run test if this file is executed directly
if (typeof window !== 'undefined' && window.location) {
  // In browser context
  testRepository().catch(console.error);
} else if (typeof process !== 'undefined') {
  // In Node.js context (won't work in browser)
  // testRepository().catch(console.error);
}

export { testRepository };