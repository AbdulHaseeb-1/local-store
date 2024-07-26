import joi from "joi";

const CheckoutValidator = joi.object({
    name: joi.string().min(3).required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name is required',
        'string.min': 'Name should have a minimum length of {#limit}',
        'any.required': 'Name is required'
    }),
    phone: joi.string().pattern(/^\d{11}$/).required().messages({
        'string.pattern.base': 'Phone number must be exactly 11 digits',
        'string.empty': 'Phone is required',
        'any.required': 'Phone number is required'
    }),
    city: joi.string().min(3).required().messages({
        'string.base': 'City should be a type of text',
        'string.empty': 'City is required',
        'string.min': 'City should have a minimum length of {#limit}',
        'any.required': 'City is required'
    }),
    state: joi.string().min(3).required().messages({
        'string.base': 'State should be a type of text',
        'string.empty': 'State is required',
        'string.min': 'State should have a minimum length of {#limit}',
        'any.required': 'State is required'
    }),
    shippingAddress: joi.string().min(10).required().messages({
        'string.base': 'Shipping Address should be a type of text',
        'string.empty': 'Shipping Address is required',
        'string.min': 'Shipping Address should have a minimum length of {#limit}',
        'any.required': 'Shipping Address is required'
    }),
    paymentMethod: joi.string().valid('cash_on_delivery').required().messages({
        'any.only': 'Payment method must be one of [cash_on_delivery]',
        'any.required': 'Payment method is required'
    })
});

export default CheckoutValidator;
