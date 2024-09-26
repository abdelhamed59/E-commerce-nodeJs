import express from 'express'
import { addBrand, deleteBrand, getBrand, getBrands, updateBrand } from './Brand.controller.js'

const brandRoutes = express.Router()

brandRoutes.route("/")
    .post(addBrand)
    .get(getBrands)

brandRoutes.route("/:id")
    .put(updateBrand)
    .get(getBrand)
    .delete(deleteBrand)



export default brandRoutes