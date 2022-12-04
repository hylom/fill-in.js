import { fillIn } from '../lib/fill-in.js';
import { loadSampleJson, delayedWrite } from './test-util.js';
import mockStdin from 'mock-stdin';
//jest.unmock('mock-stdin');

test('fill in with "Person" schema', async () => {
  const schema = await loadSampleJson('profile');

  const stdin = mockStdin.stdin();
  delayedWrite(stdin, 100, 10,
               ['first', 'last', '10', 'male', 'aaa', 'bbb', '', '\b\byes']);
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

test('fill in with "Person" schema with ignoreDefaultProperty', async () => {
  const schema = await loadSampleJson('profile');
  const opt = { ignoreDefaultProperty: true };

  const stdin = mockStdin.stdin();
  delayedWrite(stdin, 100, 10,
               ['first', 'last', '10', 'male', 'aaa', 'bbb', '', 'yes']);
  const result = await fillIn(schema, opt);
  stdin.restore();
  //console.log(result);

  expect(result).toHaveProperty('firstName', 'first');
  expect(result).toHaveProperty('lastName', 'last');
  expect(result).toHaveProperty('age', 10);
  expect(result).toHaveProperty('gender', 'male');
  expect(result).toHaveProperty('hobbies', ['aaa', 'bbb']);
  expect(result).toHaveProperty('public', true);
});

test('fill in with "Person" schema with onlyRequired', async () => {
  const schema = await loadSampleJson('profile');

  const stdin = mockStdin.stdin();
  delayedWrite(stdin, 100, 10,
               ['first', 'last', '']);
  const result = await fillIn(schema, { onlyRequired: true });
  stdin.restore();
  //console.log(result);

  expect(result).toHaveProperty('firstName', 'first');
  expect(result).toHaveProperty('lastName', 'last');
  expect(result).not.toHaveProperty('age');
  expect(result).not.toHaveProperty('gender');
  expect(result).not.toHaveProperty('hobbies');
  expect(result).toHaveProperty('public', false);
});

test('fill in with "Person" schema with defaults option', async () => {
  const schema = await loadSampleJson('profile');
  const defaults = { firstName: 'John', lastName: 'Smith' };
  const opt = { defaults };

  const stdin = mockStdin.stdin();
  delayedWrite(stdin, 100, 10,
               ['', '', '25', 'male', 'programming', '', '\b\byes']);
  const result = await fillIn(schema, opt);
  stdin.restore();
  //console.log(result);

  expect(result).toHaveProperty('firstName', 'John');
  expect(result).toHaveProperty('lastName', 'Smith');
  expect(result).toHaveProperty('age', 25);
  expect(result).toHaveProperty('gender', 'male');
  expect(result).toHaveProperty('hobbies', [ 'programming' ]);
  expect(result).toHaveProperty('public', true);
});
