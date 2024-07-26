import Joi from "joi";

const ProductValidator = Joi.object({
    title: Joi.string().min(13).required(),
    description: Joi.string().required(),
    category: Joi.string(),
    brand: Joi.string(),
    condition: Joi.string().required(),
    price: Joi.number().min(99),
    stock: Joi.number().required(),
    size: Joi.string(),
    color: Joi.string().required(),
    image1: Joi.any(),
    image3: Joi.any(),
    image2: Joi.any(),
    image4: Joi.any(),
    isFeatured: Joi.boolean()
});

export default ProductValidator;