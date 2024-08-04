import * as joi from "joi";

const signUpValidator = joi.object({
  name: joi
    .string()
    .regex(/^[A-Za-z ]+$/)
    .messages({
      "string.base": `Name should be a type of 'text'`,
      "string.empty": "Name cannot be empty",
      "any.required": `Name is a required.`,
      "string.pattern.base": "Name can only contain Alphabets",
    }),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).messages({
      "string.base": `Email should be a type of 'text'`,
      "string.empty": "Email cannot be empty",
      "any.required": `Email is a required`,
      'string.email': 'Email must be Valid ',
    }),
  password: joi
    .string()
    .pattern(/^(?=.*[A-Z!@#$%^&*><~(){}[]).+$/)
    .min(8)
    .messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password cannot be an empty field`,
      "string.min": `Password should have a minimum length of {#limit}`,
      "any.required": `Password is a required field`,
      "string.pattern.base":
        "Password must contain at least on uppercase letter of symbol",
    }),
  confirm: joi.string().required().messages({
    "string.empty": `Confirm Password cannot be an empty field`,
    "any.required": `Confirm Password is a required field`,
  })
});

export default signUpValidator;
