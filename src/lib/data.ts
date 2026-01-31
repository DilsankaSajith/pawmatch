const SIMULATED_DELAY = 10000;

export const demoResult = {
  animalCount: 4,
  animalType: 'cat',
  description:
    'Four young kittens are found huddled in a cardboard box outdoors. They appear to be at a highly vulnerable age and lack adequate protection from predators or the elements. One kitten in the foreground exhibits possible signs of an eye infection.',
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
