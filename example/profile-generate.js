import { fillIn } from '../lib/fill-in.js';

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
