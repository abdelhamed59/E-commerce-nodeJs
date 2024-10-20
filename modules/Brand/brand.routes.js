import express from 'express'
import { validation } from '../../middleware/validation.js'
import { uploadSingle } from '../../utili/fileUpload.js'
import { addBrand, deleteBrand, getBrand, getBrands, updateBrand } from './brand.controller.js'
import { brandSchema, updateBrandSchema, getByIdSchema } from './brand.validation.js'
import { allowTo, protectRoute } from '../../middleware/verifyToken.js'

const brandRoutes=express.Router()
brandRoutes.route("/")
    .post(protectRoute,allowTo("admin"),uploadSingle("image"), validation(brandSchema), addBrand)
    .get(getBrands)

brandRoutes.route("/:id")
    .put(protectRoute,allowTo("admin"),uploadSingle("image"), validation(updateBrandSchema), updateBrand)
    .get(validation(getByIdSchema), getBrand)
    .delete(protectRoute,allowTo("admin"),validation(getByIdSchema), deleteBrand)

export default brandRoutes