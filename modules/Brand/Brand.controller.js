import slugify from "slugify";
import { Brand } from "../../DB/models/Brand.model.js";
import handleError from "../../middleware/handelAsyncError.js";


const addBrand=handleError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    let brand=await Brand.insertMany(req.body)
    res.status(201).json({message:"Brand added",brand})
})

const getBrands=handleError(async(req,res,next)=>{
const allBrands=await Brand.find()
res.status(200).json({message:"all Brands",count:allBrands.length,allBrands})
})

const getBrand=handleError(async(req,res,next)=>{
    let{id}=req.params
    const brand=await Brand.findById(id)
    brand||res.status(200).json({message:"not found"})
    !brand||res.status(200).json({message:"success",brand})
})

const updateBrand=handleError(async(req,res,next)=>{
    let{id}=req.params
    if(req.body.name)
        req.body.slug=slugify(req.body.name)

    const brand=await Brand.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json({message:"success",brand})
})

const deleteBrand=handleError(async(req,res,next)=>{
    let{id}=req.params
    const brand=await Brand.findByIdAndDelete(id)
    brand||res.status(200).json({message:"not found"})
     !brand||res.status(200).json({message:"success",brand})

})

export{
    addBrand,
    getBrands,
    getBrand,
    updateBrand,
    deleteBrand
}