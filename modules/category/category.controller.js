import slugify from "slugify";
import { Category } from "../../DB/models/category.model.js";
import handleError from "../../middleware/handelAsyncError.js";


const addCategory=handleError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.image=req.file.filename
    console.log(req.file);
    
    let category=await Category.insertMany(req.body)
    res.status(201).json({message:"category added",category})
})

const getCategories=handleError(async(req,res,next)=>{
const allCategories=await Category.find()
res.status(200).json({message:"all categories",count:allCategories.length,allCategories})
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

const deleteCategory=handleError(async(req,res,next)=>{
    let{id}=req.params
    const category=await Category.findByIdAndDelete(id)
     category||res.status(200).json({message:"not found"})
     !category||res.status(200).json({message:"success",category})

})

export{
    addCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}