import slugify from "slugify";
import { Category } from "../../DB/models/category.model.js";
import handleError from "../../middleware/handelAsyncError.js";
import { deleteOne } from "../../middleware/handler.js";
import apiFeatuers from "../../utili/apiFeatuers.js";


const addCategory=handleError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.image=req.file.filename
    console.log(req.file);
    
    let category=await Category.insertMany(req.body)
    res.status(201).json({message:"category added",category})
})

const getCategories=handleError(async(req,res,next)=>{
    let apiFeatuer= new apiFeatuers(Category.find(),req.query).pagination().fields().filter().sort().search()

const allCategories=await apiFeatuer.preModel
res.status(200).json({message:"all categories",page:apiFeatuer.page,count:allCategories.length,allCategories})
})

const getCategory=handleError(async(req,res,next)=>{
    let{id}=req.params
    const category=await Category.findById(id)
    category||res.status(200).json({message:"not found"})
    !category||res.status(200).json({message:"success",category})
})

const updateCategory=handleError(async(req,res,next)=>{
    let{id}=req.params
    if(req.body.name)
        req.body.slug=slugify(req.body.name)

    const category=await Category.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json({message:"success",category})
})

const deleteCategory=deleteOne(Category)

export{
    addCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}