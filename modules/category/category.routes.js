import express from 'express'
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from './category.controller.js'
import { validation } from '../../middleware/validation.js'
import { categorySchema, getByIdSchema } from './category.validation.js'
import { uploadSingle } from '../../utili/fileUpload.js'

const categoryRoutes = express.Router()

categoryRoutes.route("/")
    .post(uploadSingle("image"),validation(categorySchema),addCategory)
    .get(getCategories)

categoryRoutes.route("/:id")
    .put(updateCategory)
    .get(validation(getByIdSchema),getCategory)
    .delete(validation(categorySchema),deleteCategory)



export default categoryRoutes