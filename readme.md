# fillin.js

Interactive fill in via stdin and generate JSON from the input, based on JSON schema.

## TL;DR: 

 - This is a JSON format configuration file gemerator.
 - Takes JavaScript object in JSON Schema format that defines the configuration file format.
 - Interactively prompts the userer and generates a configuration file according to the input JavaScript object and user input.

## Example

```
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

```
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
 

## License

MIT License.
