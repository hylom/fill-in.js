import { fillIn } from '../lib/fill-in.js';
import fs from 'fs';

function usage() {
  const usage = `${process.argv0} ${process.argv[1]} <schema.json>[<default.json>]`;
  console.log(usage);
}


async function main() {
  const schemaFile = process.argv[2];
  if (schemaFile === undefined) {
    usage();
    return;
  }
  const defaultFile = process.argv[3];
  let defaultValue = undefined;
  if (defaultFile !== undefined) {
    const defaultJson = await fs.promises.readFile(defaultFile, { encoding: 'utf8' });
    defaultValue = JSON.parse(defaultJson);
  }

  const schemaJson = await fs.promises.readFile(schemaFile, { encoding: 'utf8' });
  const schema = JSON.parse(schemaJson);
  const result = await fillIn(schema, { defaults: defaultValue });
  console.log(result);
}

main();
