import express from 'express'
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from './category.controller.js'
import { validation } from '../../middleware/validation.js'
import { categorySchema, getByIdSchema } from './category.validation.js'
import { uploadSingle } from '../../utili/fileUpload.js'
import subCategoryRoutes from '../subCategory/subCategory.routes.js'
import { allowTo, protectRoute } from '../../middleware/verifyToken.js'

const categoryRoutes = express.Router()
categoryRoutes.use("/:category/subCategory",subCategoryRoutes)
categoryRoutes.route("/")
    .post(protectRoute,allowTo("admin"),uploadSingle("image"),validation(categorySchema),addCategory)
    .get(getCategories)

categoryRoutes.route("/:id")
    .put(protectRoute,allowTo("admin"),uploadSingle("image"),updateCategory)
    .get(validation(getByIdSchema),getCategory)
    .delete(protectRoute,allowTo("admin"),validation(getByIdSchema),deleteCategory)



export default categoryRoutes