import Joi from "joi";

const AttributeValidator = Joi.object({
  attributeName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      "string.pattern.base": "Only Alphabets are allowed",
      "string.empty": "Attribute Name is required",
      "any.required": "Attribute Name is required",
    }),
  attributeValue: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      "string.pattern.base": "Only Alphabets are allowed",
      "string.empty": "Attribute Value is required",
      "any.required": "Attribute Value is required",
    }),
});

export default AttributeValidator;
