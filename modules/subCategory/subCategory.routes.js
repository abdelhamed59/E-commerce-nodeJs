import express from 'express'
import { addSubCategory, deleteSubCategory, getSubCategories, getSubCategory, updateSubCategory } from './subCategory.controller.js'

const subCategoryRoutes = express.Router()

subCategoryRoutes.route("/")
    .post(addSubCategory)
    .get(getSubCategories)

subCategoryRoutes.route("/:id")
    .put(updateSubCategory)
    .get(getSubCategory)
    .delete(deleteSubCategory)



export default subCategoryRoutes