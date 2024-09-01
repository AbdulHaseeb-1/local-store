import Joi, { optional } from "joi";

const ProductValidator = Joi.object({
    title: Joi.string().min(10).required(),
    subTitle:Joi.string(),
    description: Joi.string().required(),
    category: Joi.string(),
    brand: Joi.string(),
    purchase_price: Joi.number().min(99),
    selling_price: Joi.number().min(99),
    stock: Joi.number().required(),
    image1: Joi.any(),
    image3: Joi.any(),
    image2: Joi.any(),
    image4: Joi.any(),
    isFeatured: Joi.boolean()
});

export default ProductValidator;