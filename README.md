
# IAM Policy Validator

This package provides a method to validate AWS IAM Role Policy format in input JSON data.

## Installation

To install the required dependencies, run:

```bash
npm install
```

## Usage

### `checkResource(jsonData)`

The `checkResource` method validates the input JSON data against the AWS IAM Role Policy format. It returns `false` if input JSON Resource field contains a single asterisk, and `true` otherwise.

To use the method, import it into your JavaScript file:

```javascript
const checkResource = require('./checkResource');

const jsonData = `{
  "PolicyName": "root",
  "PolicyDocument": {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Sid": "IamListAccess",
              "Effect": "Allow",
              "Action": [
                  "iam:ListRoles",
                  "iam:ListUsers"
              ],
              "Resource": "arn:aws:s3:::example-bucket/*"
          }
      ]
  }
}`;

console.log(checkResource(jsonData)); // Output: true
```

### Running Code

To run the script, use the following command:
```bash
node checkResource.js
```

### Running Tests

To run the unit tests for the `checkResource` method, use the following command:

```bash
npm test
```

This will execute Jest and run all the tests defined in the `checkResource.test.js` file.
