import { fillIn } from '../lib/fill-in.js';
import { loadSampleJson, delayedWrite } from './test-util.js';
import mockStdin from 'mock-stdin';
//jest.unmock('mock-stdin');

test('fill in with "Person" schema', async () => {
  const schema = await loadSampleJson('profile');

  const stdin = mockStdin.stdin();
  delayedWrite(stdin, 1000, 100,
               ['first', 'last', '10', 'male', 'aaa', 'bbb', '', 'yes']);
  const result = await fillIn(schema);
  stdin.restore();
  //console.log(result);

  expect(result).toHaveProperty('firstName', 'first');
  expect(result).toHaveProperty('lastName', 'last');
  expect(result).toHaveProperty('age', 10);
  expect(result).toHaveProperty('gender', 'male');
  expect(result).toHaveProperty('hobbies', ['aaa', 'bbb']);
  expect(result).toHaveProperty('public', true);
});
