
export class InteractiveJsonGenerator {
  constructor(schema) {
    // TODO: valicate schema
    this.schema = schema;
  }

  async generate() {
    const result = {};
    const props = Object.keys(this.schema.properties).sort((a, b) => {
      return this.schema[b] - this.schema[a];
    });
    for (const k of props) {
      result[k] = true;
    }
    return result;
  }
}


