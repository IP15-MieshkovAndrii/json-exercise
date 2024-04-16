const fs = require('fs');

const checkResource = (jsonData) => {
  try {
    const data = JSON.parse(jsonData);

    if (
        !data.PolicyName ||
        !data.PolicyDocument ||
        !data.PolicyDocument.Version ||
        !data.PolicyDocument.Statement
    ) {
        console.error("Missing required fields in input JSON.");
        return true;
    }

    if (
        typeof data.PolicyDocument.Version !== "string" ||
        !Array.isArray(data.PolicyDocument.Statement)
    ) {
        console.error("Invalid format for PolicyDocument.");
        return true;
    }


    for (const statement of data.PolicyDocument.Statement) {
      if (!statement.Sid || !statement.Effect || !statement.Action) {
        console.error("Missing required fields in Statement.");
        return true;
      }

      if (!Array.isArray(statement.Action)) {
        console.error("Action field must be an array in Statement.");
        return true;
      }

      if (statement.Resource === "*") {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return true;
  }
}


fs.readFile('example.json', 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

    checkResource(data)
});


module.exports = checkResource;
