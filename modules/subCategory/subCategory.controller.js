import slugify from "slugify";
import handleError from "../../middleware/handelAsyncError.js";
import { subCategory } from "../../DB/models/subCategory.model.js";


const addSubCategory=handleError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    let subcategory=await subCategory.insertMany(req.body)
    res.status(201).json({message:"subCategory added",subcategory})
})

const getSubCategories=handleError(async(req,res,next)=>{
const allSubCategories=await subCategory.find().populate("category","-createdAt -updatedAt")
res.status(200).json({message:"all SubCategories",count:allSubCategories.length,allSubCategories})
})

const getSubCategory=handleError(async(req,res,next)=>{
    let{id}=req.params
    const SubCategory=await subCategory.findById(id).populate("category","-createdAt -updatedAt")
    SubCategory||res.status(200).json({message:"not found"})
    !SubCategory||res.status(200).json({message:"success",SubCategory})
})

const updateSubCategory=handleError(async(req,res,next)=>{
    let{id}=req.params
    if(req.body.name)
        req.body.slug=slugify(req.body.name)

    const SubCategory=await subCategory.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json({message:"success",SubCategory})
})

const deleteSubCategory=handleError(async(req,res,next)=>{
    let{id}=req.params
    const SubCategory=await subCategory.findByIdAndDelete(id)
    SubCategory||res.status(200).json({message:"not found"})
     !SubCategory||res.status(200).json({message:"success",SubCategory})

})

export{
   addSubCategory,
   getSubCategories,
   getSubCategory,
   updateSubCategory,
   deleteSubCategory
}