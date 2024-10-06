import slugify from "slugify";
import handleError from "../../middleware/handelAsyncError.js";
import { subCategory } from "../../DB/models/subCategory.model.js";
import { deleteOne } from "../../middleware/handler.js";
import apiFeatuers from "../../utili/apiFeatuers.js";


const addSubCategory = handleError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename

    let subcategory = await subCategory.insertMany(req.body)
    res.status(201).json({ message: "subCategory added", subcategory })
})

const getSubCategories = handleError(async (req, res, next) => {
    let filter={}
    if(req.params.category) filter.category=req.params.category
    let apiFeatuer= new apiFeatuers(subCategory.find(filter),req.query).pagination().fields().filter().sort().search()
    const allSubCategories = await apiFeatuer.preModel
    res.status(200).json({ message: "all subCategories",page:apiFeatuer.page ,count: allSubCategories.length, allSubCategories })
})

const getSubCategory = handleError(async (req, res, next) => {
    let { id } = req.params
    const subcategory = await subCategory.findById(id)
    subcategory || res.status(200).json({ message: "not found" })
    !subcategory || res.status(200).json({ message: "success", subcategory })
})

const updateSubCategory = handleError(async (req, res, next) => {
    let { id } = req.params
    if (req.body.name)
        req.body.slug = slugify(req.body.name)
    if (req.file.filename)
        req.body.image=req.file.filename

        const subcategory = await subCategory.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json({ message: "success", subcategory })
})

const deleteSubCategory = deleteOne(subCategory)

export {
    addSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}