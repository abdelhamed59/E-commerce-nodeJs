import slugify from "slugify";
import handleError from "../../middleware/handelAsyncError.js";
import { Brand } from "../../DB/models/brand.model.js";
import { deleteOne } from "../../middleware/handler.js";
import apiFeatuers from "../../utili/apiFeatuers.js";


const addBrand = handleError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    console.log(req.file);
    let brand = await Brand.insertMany(req.body)
    res.status(201).json({ message: "Brand added", brand })
})

const getBrands = handleError(async (req, res, next) => {
    let apiFeatuer= new apiFeatuers(Brand.find(),req.query).pagination().fields().filter().sort().search()
    const allBrands =await apiFeatuer.preModel
    res.status(200).json({ message: "all Brands",page:apiFeatuer.page, count: allBrands.length, allBrands })
})

const getBrand = handleError(async (req, res, next) => {
    let { id } = req.params
    const brand = await Brand.findById(id)
    brand || res.status(200).json({ message: "not found" })
    !brand || res.status(200).json({ message: "success", brand })
})

const updateBrand = handleError(async (req, res, next) => {
    let { id } = req.params
    if (req.body.name)
        req.body.slug = slugify(req.body.name)
    if (req.file)
        req.body.logo=req.file.filename

        const brand = await Brand.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json({ message: "success", brand })
})

const deleteBrand =deleteOne(Brand)

export {
   addBrand,
   getBrand,
   getBrands,
   updateBrand,
   deleteBrand
}