import express from 'express'
import { validation } from '../../middleware/validation.js'
import {  getByIdSchema, subCategorySchema, updateSubCategorySchema } from './subCategory.validation.js'
import { uploadSingle } from '../../utili/fileUpload.js'
import { addSubCategory, deleteSubCategory, getSubCategories, getSubCategory, updateSubCategory } from './subCategory.controller.js'
import { allowTo, protectRoute } from '../../middleware/verifyToken.js'

const subCategoryRoutes = express.Router({mergeParams:true})

subCategoryRoutes.route("/")
    .post(protectRoute,allowTo("admin"),uploadSingle("image"), validation(subCategorySchema), addSubCategory)
    .get(getSubCategories)

subCategoryRoutes.route("/:id")
    .put(protectRoute,allowTo("admin"),uploadSingle("image"),validation(updateSubCategorySchema),updateSubCategory)
    .get(validation(getByIdSchema), getSubCategory)
    .delete(protectRoute,allowTo("admin"),validation(getByIdSchema), deleteSubCategory)



export default subCategoryRoutes