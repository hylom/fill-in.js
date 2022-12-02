import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export async function loadSampleJson(name) {
  const pathname = path.join(_getSampleDir(), `${name}.json`);
  const json = await fs.promises.readFile(pathname, {encoding: 'utf8'});
  return JSON.parse(json);
}

function _getSampleDir() {
  const thisDir = path.dirname(fileURLToPath(import.meta.url));
  const relDir = path.join(thisDir, '..', 'sample');
  return path.normalize(relDir);
}
