import { InteractiveJsonGenerator } from '../lib/generator.js';
import { loadSampleJson } from './test-util.js';


test('test with "Person" schema', async () => {
  const schema = await loadSampleJson('profile');
  const gen = new InteractiveJsonGenerator(schema);
  const result = await gen.generate();
  console.log(result);
  expect(result).toHaveProperty('firstName', true);
});
