import express from 'express'
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from './category.controller.js'

const categoryRoutes = express.Router()

categoryRoutes.route("/")
    .post(addCategory)
    .get(getCategories)

categoryRoutes.route("/:id")
    .put(updateCategory)
    .get(getCategory)
    .delete(deleteCategory)



export default categoryRoutes