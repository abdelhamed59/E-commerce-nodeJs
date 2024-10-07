import express from 'express'
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from './product.controller.js'
import { uploadFields } from '../../utili/fileUpload.js'
import { validation } from '../../middleware/validation.js'
import { getProductByIdSchema, productSchema, updateProductSchema } from './product.validation.js'
import { allowTo, protectRoute } from '../../middleware/verifyToken.js'

const productRoutes = express.Router()

productRoutes.route("/")
    .post(protectRoute,allowTo("admin"),uploadFields([{name:'imageCover',maxCount:1},{name:"images",maxCount:10}]),validation(productSchema),addProduct)
    .get(getProducts)

productRoutes.route("/:id")
    .put(uploadFields([{name:'imageCover',maxCount:1},{name:"images",maxCount:10}]),validation(updateProductSchema),updateProduct)
    .get(validation(getProductByIdSchema),getProduct)
    .delete(validation(getProductByIdSchema),deleteProduct)



export default productRoutes