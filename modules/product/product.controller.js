import slugify from "slugify";
import handleError from "../../middleware/handelAsyncError.js";
import { Product } from "../../DB/models/product.model.js";
import { deleteOne } from "../../middleware/handler.js";
import apiFeatuers from "../../utili/apiFeatuers.js";


const addProduct = handleError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map(ele => ele.filename)
    let product = await Product.insertMany(req.body)
    res.status(201).json({ message: "Product added", product })
})

const getProducts = handleError(async (req, res, next) => {
    
   let apiFeatuer= new apiFeatuers(Product.find(),req.query).pagination().fields().filter().sort().search()
    const allProducts = await apiFeatuer.preModel
        .populate("category", "-createdAt -updatedAt")
        .populate("brand", "-createdAt -updatedAt")
        .populate("subCategory", "-createdAt -updatedAt")
    res.status(200).json({ message: "all Products", page:apiFeatuer.page, count: allProducts.length, allProducts })
})

const getProduct = handleError(async (req, res, next) => {
    let { id } = req.params
    const product = await Product.findById(id)
        .populate("category", "-createdAt -updatedAt")
        .populate("brand", "-createdAt -updatedAt")
        .populate("subCategory", "-createdAt -updatedAt")
    product || res.status(200).json({ message: "not found" })
    !product || res.status(200).json({ message: "success", product })
})

const updateProduct = handleError(async (req, res, next) => {
    let { id } = req.params
    if (req.body.title) req.body.slug = slugify(req.body.title)
    if (req.files.imageCover) req.body.imageCover = req.files.imageCover[0].filename
    if (req.files.images) req.body.images = req.files.images.map(ele => ele.filename)
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json({ message: "success", product })
})

const deleteProduct = deleteOne(Product)

export {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}