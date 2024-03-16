const Ajv = require("ajv");
const fs = require("fs");
const path = require("path");

const ajv = new Ajv();

const validateSchema = (event) => {
  const schemaName = event.key;
  const schemaDir = schemaName.replace(/\./g, '/');
  const schemaPath = path.join(__dirname, `/schemas/${schemaDir}/${event.value.properties.event_version}.json`);
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

  const validate = ajv.compile(schema);
  const result = validate(event);

  if (result) {
    console.log("Event is valid");
  } else {
    console.log("Event is invalid");
    console.log(validate.errors);
  }
  return result;
}

module.exports = validateSchema;
