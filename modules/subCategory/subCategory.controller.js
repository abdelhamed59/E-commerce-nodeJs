import slugify from "slugify";
import handleError from "../../middleware/handelAsyncError.js";
import { subCategory } from "../../DB/models/subCategory.model.js";


const addSubCategory = handleError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    console.log(req.file);

    let subcategory = await subCategory.insertMany(req.body)
    res.status(201).json({ message: "subCategory added", subcategory })
})

const getSubCategories = handleError(async (req, res, next) => {
    const allSubCategories = await subCategory.find()
    res.status(200).json({ message: "all subCategories", count: allSubCategories.length, allSubCategories })
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

const deleteSubCategory = handleError(async (req, res, next) => {
    let { id } = req.params
    const subcategory = await subCategory.findByIdAndDelete(id)
    subcategory || res.status(200).json({ message: "not found" })
    !subcategory || res.status(200).json({ message: "success", subcategory })

})

export {
    addSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}