import { ask } from './ask.js';

export async function fillIn(schema, option={}) {
  const currentResult = option.defaults || {};
  return await fillInRecursive('', schema, option, currentResult);
}

async function fillInRecursive(keyName, schema, option, currentResult) {
  if (schema.type == 'object') {
    let props;
    if (option.onlyRequired && schema.required) {
      props = schema.required;
    } else {
      props = Object.keys(schema.properties);
    }
    props = props.sort((a, b) => {
      const oA = schema.properties[a].order;
      const oB = schema.properties[b].order;
      if (oA === undefined) {
        return 1;
      }
      if (oB === undefined) {
        return -1;
      }
      return oA - oB;
    });

    const result = {};
    for (const k of props) {
      const prop = schema.properties[k];
      result[k] = await fillInRecursive(keyName, prop, option, currentResult);
    }
    return result;
  }
  
  return await ask(keyName, schema, option, currentResult);
}
