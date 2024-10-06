import Joi from "joi";

export const productSchema=Joi.object({
    name:Joi.string().min(4).max(20).trim().required(),
    description:Joi.string().min(20).max(200).trim().required(),
    price:Joi.number().min(0).required(),
    priceAfterDiscount:Joi.number().min(0).required(),
    quantity:Joi.number().min(0).required(),    
    category: Joi.string().hex().length(24).required(),
    brand:Joi.string().hex().length(24).required(),
    subCategory:Joi.string().hex().length(24).required(),
    createdBy:Joi.string().hex().length(24).optional(),
    imageCover:Joi.array().items(Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid("image/jpg","image/jpeg","image/png").required(),
        destination:Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    }).required()).required(),
    images:Joi.array().items(Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid("image/jpg","image/jpeg","image/png").required(),
        destination:Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    }).required()).required(),
   
})

export const getProductByIdSchema=Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateProductSchema=Joi.object({
    name:Joi.string().min(4).max(20).trim().optional(),
    description:Joi.string().min(20).max(200).trim().optional(),
    price:Joi.number().min(0).optional(),
    priceAfterDiscount:Joi.number().min(0).optional(),
    quantity:Joi.number().min(0).optional(), 
    id:Joi.string().hex().length(24).required(),
    category: Joi.string().hex().length(24).optional(),
    brand:Joi.string().hex().length(24).optional(),
    subCategory:Joi.string().hex().length(24).optional(),
    createdBy:Joi.string().hex().length(24).optional(),
    imageCover:Joi.array().items(Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid("image/jpg","image/jpeg","image/png").required(),
        destination:Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    }).required()).optional(),
    images:Joi.array().items(Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid("image/jpg","image/jpeg","image/png").required(),
        destination:Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    }).required()).optional(),

})