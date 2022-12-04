# fill-in.js

Interactive fill in via stdin and generate JSON from the input, based on JSON schema.

## Install

```
$ npm i fill-in
```

## TL;DR: 

 - This is a JavaScript object generator.
 - Takes JavaScript object in JSON Schema format that defines the configuration file format.
 - Interactively prompts the userer and generates a configuration file according to the JSON Schema and user input.

## Example

```javascript
import { fillIn } from 'fill-in';

async function main() {
  const schema = {
    "title": "Profile",
    "type": "object",
    "properties": {
      "firstName": {
        "type": "string",
        "description": "your first name",
        "examples": [ "Jane" ],
        "minLength": 1,
        "order": 10
      },
      "lastName": {
        "type": "string",
        "description": "your last name",
        "examples": [ "Doe" ],
        "minLength": 1,
        "order": 20
      },
      "age": {
        "type": "integer",
        "description": "your age",
        "examples": [ 30 ],
        "order": 30
      },
      "gender": {
        "type": "string",
        "description": "your gender",
        "enum": [ "male", "female", "other" ],
        "order": 40
      },
      "hobbies": {
        "type": "array",
        "description": "your hobbies",
        "order": 50,
        "items": {
          "type": "string"
        }
      },
      "public": {
        "type": "boolean",
        "description": "make your profile public",
        "order": 60,
        "default": false
      }
    },
    "required": [ "firstName", "lastName", "public" ]
  };

  const result = await fillIn(schema);
  console.log(result);
}

main();
```

```bash
$ node example/profile-generate.js
your first name: John
your last name: Smith
your age: 25
your gender [male/female/other]: male
your hobbies (you can enter multiple items. Terminate input by pressing Enter without value): Programming

make your profile public? (yes/no): no
{
  firstName: 'John',
  lastName: 'Smith',
  age: 25,
  gender: 'male',
  hobbies: [ 'Programming' ],
  public: false
}

```

## Example JSON Schema

See `sample` directory.

## References

### async function fillIn(schema, option={})

 - `schema`: An object that defines the output format in JSON Schema
 - `option`: An object containing options to modify the behavior

#### Available options:

 - `option.onlyRequired`: `boolean`. If `true`, only process `required` properties. Default: `false`
 - `option.defaults`: `object`. If this value is given, use this object's each property as default value. Default: `undefined`
 - `option.ignoreDefaultProperty`: `boolean`. If `true`, ignore all `default` properties in input JSON Schema. Default: `false`
 

## License

MIT License.

## ChangeLog

 - v1.0.2 - 2022-12-04
   - support `defaults` and `ignoreDefaultProperty` options
 - v1.0.1 - 2022-12-04
   - fix documentation and publish settings
 - v1.0.0 - 2022-12-04
   - Initial public release
