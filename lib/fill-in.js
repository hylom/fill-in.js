import { ask } from './ask.js';

export async function fillIn(schema, option={}) {
  const result = {};
  const props = Object.keys(schema.properties).sort((a, b) => {
    return schema[b] - schema[a];
  });
  for (const k of props) {
    const prop = schema.properties[k];
    if (prop.type == 'object') {
      result[k] = await fillIn(prop, option);
    } else {
      result[k] = await ask(k, prop, option);
    }
  }
  return result;
}


