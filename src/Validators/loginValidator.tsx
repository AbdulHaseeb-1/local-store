import * as joi from "joi";

const loginValidator = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required()
    .messages({
      "string.base": `Email should be a type of 'text'`,
      "string.empty": `Email cannot be an empty field`,
      "any.required": `Email is a required`,
    }),
  password: joi.string().required().messages({
    "string.base": `Password should be a type of 'text'`,
    "string.empty": `Password cannot be an empty field`,
    "any.required": `Password is a required field`,
  }).required(),
});

export default loginValidator;
