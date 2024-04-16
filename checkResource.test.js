const checkResource = require('./checkResource');


// Method shall return logical false if an input JSON Resource field contains a single asterisk and true in any other case. 


describe('checkResource function', () => {

  test('Should return false if Resource field contains a single asterisk', () => {
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
                  "Resource": "*"
              }
          ]
      }
    }`;

    expect(checkResource(jsonData)).toBe(false);
  });

  test('Should return true if Resource field does not contain a single asterisk', () => {
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

    expect(checkResource(jsonData)).toBe(true);
  });

  test('Should return true for invalid JSON data', () => {
    const invalidJsonData = 'This is not a valid JSON';

    expect(checkResource(invalidJsonData)).toBe(true);
  });

  test('Should return true if Resource field is missing', () => {
    const jsonDataWithoutResource = `{
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
                  ]
              }
          ]
      }
    }`;

    expect(checkResource(jsonDataWithoutResource)).toBe(true);
  });

  test('Should return true if PolicyDocument or Statement field is missing', () => {
    const jsonDataWithoutPolicyDoc = `{
      "PolicyName": "root"
    }`;

    expect(checkResource(jsonDataWithoutPolicyDoc)).toBe(true);
  });

  test('Should return true if PolicyDocument.Version is not a string', () => {
    const jsonDataInvalidVersion = `{
      "PolicyName": "root",
      "PolicyDocument": {
          "Version": 123,
          "Statement": []
      }
    }`;

    expect(checkResource(jsonDataInvalidVersion)).toBe(true);
  });

  test('Should return true if PolicyDocument.Statement is not an array', () => {
    const jsonDataInvalidStatement = `{
      "PolicyName": "root",
      "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": "Not an array"
      }
    }`;

    expect(checkResource(jsonDataInvalidStatement)).toBe(true);
  });

  test('Should return true if any Statement is missing Sid, Effect, or Action', () => {
    const jsonDataInvalidStatement = `{
      "PolicyName": "root",
      "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Sid": "IamListAccess",
                  "Effect": "Allow",
                  "Action": ["iam:ListRoles"]
              },
              {
                  "Sid": "IamListUsers",
                  "Effect": "Allow"
              }
          ]
      }
    }`;

    expect(checkResource(jsonDataInvalidStatement)).toBe(true);
  });

  test('Should return true if any Statement Action is not an array', () => {
    const jsonDataInvalidStatement = `{
      "PolicyName": "root",
      "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Sid": "IamListAccess",
                  "Effect": "Allow",
                  "Action": "iam:ListRoles"
              }
          ]
      }
    }`;

    expect(checkResource(jsonDataInvalidStatement)).toBe(true);
  });

});
