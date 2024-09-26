import slugify from "slugify";
import handleError from "../../middleware/handelAsyncError.js";
import { Product } from "../../DB/models/product.model.js";


const addProduct = handleError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    let product = await Product.insertMany(req.body)
    res.status(201).json({ message: "Product added", product })
})

const getProducts = handleError(async (req, res, next) => {
    const allProducts = await Product.find()
        .populate("category", "-createdAt -updatedAt")
        .populate("brand", "-createdAt -updatedAt")
        .populate("subCategory", "-createdAt -updatedAt")
    res.status(200).json({ message: "all Products", count: allProducts.length, allProducts })
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
    if (req.body.name)
        req.body.slug = slugify(req.body.name)

    const product = await Product.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json({ message: "success", product })
})

const deleteProduct = handleError(async (req, res, next) => {
    let { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    product || res.status(200).json({ message: "not found" })
    !product || res.status(200).json({ message: "success", product })

})

export {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}