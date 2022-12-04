import { read } from './async-read.js';

export async function ask(name, schema, option={}, defaultValue) {
  let validator = (schema, val) => val; // default validator returns a given value
  let converter = val => val; // default value to string converter

  if (schema.type == 'string') {
    if (schema.minLength !== undefined
        || schema.maxLength !== undefined) {
      validator = stringLengthValidator;
    }
    // if enum is given, minLength and maxLength are ignored.
    if (Array.isArray(schema.enum)) {
      validator = enumStringValidator;
    }
  } else if (schema.type == 'number') {
    validator = numberValidator;
  } else if (schema.type == 'integer') {
    validator = numberValidator;
  } else if (schema.type == 'array') {
    validator = newArrayValidator();
    converter = arrayConverter;
  } else if (schema.type == 'boolean') {
    validator = booleanValidator;
    converter = booleanConverter;
  } else {
    // other type is not supported
    throw Error(`${schema.type} type is not supported!`);
  }

  const prompt = buildPrompt(name, schema);
  const readOpt = { prompt, };
  if (defaultValue !== undefined) {
    readOpt.default = converter(defaultValue);
    readOpt.edit = true;
  } else if (!option.ignoreDefaultProperty && schema.default !== undefined) {
    readOpt.default = converter(schema.default);
    readOpt.edit = true;
  }

  while (true) {
    const { result, isDefault } = await read(readOpt);
    try {
      return validator(schema, result);
    } catch (err) {
      if (err.message.length === 0) {
        // continue and input next line
        readOpt.prompt = '';
      } else {
        console.log(err.message);
      }
    }
  }
}

function booleanConverter(val) {
  return val ? 'yes': 'no';
}

function arrayConverter(val) {
  // TODO: currently default is not supported in array type
  return undefined;
}



// generate arrayValidator
function newArrayValidator() {
  const result = [];
  return (schema, val) => {
    if (val.length == 0) {
      return result;
    }
    result.push(val);
    throw Error('');
  };
}

function stringLengthValidator(schema, val) {
  const minLength = schema.minLength || 0;
  if (schema.maxLength !== undefined) {
    const maxLength = schema.maxLength;
    if (val.length < minLength || val.length > maxLength) {
    throw Error(`Please enter ${minLength} to ${maxLength} characters!`);
    }
    return val;
  }

  if (val.length < minLength) {
    throw Error(`Please enter at least ${minLength} characters!`);
  }
  return val;
}

function enumStringValidator(schema, val) {
  if (val.length == 0) {
    throw Error('Please select a value!');
  }
  if (schema.enum.findIndex(el => (el == val)) == -1) {
    throw Error(`Please select a value from [${schema.enum.join('/')}]!`);
  }
  return val;
}

function booleanValidator(schema, val) {
  if (val == 'yes') {
    return true;
  } else if (val == 'no') {
    return false;
  }
  throw Error(`${val}: Please select "yes" or "no"!`);
}

function numberValidator(schema, val) {
  if (val.length == 0) {
    throw Error('Please input a number!');
  }
  const num = Number(val);
  if (isNaN(num)) {
    throw Error(`"${val}" is not a number. Please input a number!`);
  }
  return num;
}

function buildPrompt(name, schema) {
  const msg = [];
  let desc = schema.description;
  if (desc === undefined) {
    desc = name;
    }
  if (schema.type == 'boolean') {
    desc = desc + '?';
  }
  msg.push(desc);

  if (Array.isArray(schema.enum)) {
    msg.push(`[${schema.enum.join('/')}]`);
  }

  if (schema.type == 'array') {
    msg.push('(you can enter multiple items. Terminate input by pressing Enter without value)');
  }

  if (schema.type == 'boolean') {
    msg.push('(yes/no)');
  }

  return msg.join(' ') + ':';
}
