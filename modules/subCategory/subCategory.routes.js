import express from 'express'
import { validation } from '../../middleware/validation.js'
import {  getByIdSchema, subCategorySchema, updateSubCategorySchema } from './subCategory.validation.js'
import { uploadSingle } from '../../utili/fileUpload.js'
import { addSubCategory, deleteSubCategory, getSubCategories, getSubCategory, updateSubCategory } from './subCategory.controller.js'

const subCategoryRoutes = express.Router({mergeParams:true})

subCategoryRoutes.route("/")
    .post(uploadSingle("image"), validation(subCategorySchema), addSubCategory)
    .get(getSubCategories)

subCategoryRoutes.route("/:id")
    .put(uploadSingle("image"),validation(updateSubCategorySchema),updateSubCategory)
    .get(validation(getByIdSchema), getSubCategory)
    .delete(validation(getByIdSchema), deleteSubCategory)



export default subCategoryRoutes