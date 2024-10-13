import express from 'express'
import { validation } from '../../middleware/validation.js'
import { uploadSingle } from '../../utili/fileUpload.js'
import { addBrand, deleteBrand, getBrand, getBrands, updateBrand } from './Brand.controller.js'
import { brandSchema, updateBrandSchema, getByIdSchema } from './brand.validation.js'

const brandRoutes=express.Router()
brandRoutes.route("/")
    .post(uploadSingle("image"), validation(brandSchema), addBrand)
    .get(getBrands)

brandRoutes.route("/:id")
    .put(uploadSingle("image"), validation(updateBrandSchema), updateBrand)
    .get(validation(getByIdSchema), getBrand)
    .delete(validation(getByIdSchema), deleteBrand)

export default brandRoutes