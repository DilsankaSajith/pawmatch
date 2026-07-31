const SIMULATED_DELAY = 5000;

export const demoResult = {
  animalCount: 4,
  animalType: 'cat',
  description:
    'Four very young kittens, approximately 4-6 weeks old, have been left in a cardboard box. At least one kitten shows visible signs of a possible ocular infection. They are highly vulnerable and require immediate rescue and veterinary care.',
  environment: 'Outdoor, exposed on the ground in a cardboard box',
  urgency: 'High',
  visibleIssues: ['potential eye infection', 'vulnerability due to young age'],
};

export async function sendDemoResult(
  delayMs: number = SIMULATED_DELAY,
): Promise<typeof demoResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = demoResult;
      resolve(result);
    }, delayMs);
  });
}
