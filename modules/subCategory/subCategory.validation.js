import Joi from "joi";

export const subCategorySchema=Joi.object({
    name:Joi.string().min(5).max(20).required(),
    category:Joi.string().hex().length(24).required(),
    // createdBy:Joi.string().hex().length(24).required(),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid("image/jpg","image/jpeg","image/png").required(),
        destination:Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    }).required()
})

export const getByIdSchema=Joi.object({
    id:Joi.string().hex().length(24).required()
})

export const updateSubCategorySchema=Joi.object({
    name:Joi.string().min(5).max(20).required(),
    id:Joi.string().hex().length(24).required(),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid("image/jpg","image/jpeg","image/png").required(),
        destination:Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    })

})