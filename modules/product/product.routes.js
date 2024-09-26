import express from 'express'
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from './product.controller.js'

const productRoutes = express.Router()

productRoutes.route("/")
    .post(addProduct)
    .get(getProducts)

productRoutes.route("/:id")
    .put(updateProduct)
    .get(getProduct)
    .delete(deleteProduct)



export default productRoutes