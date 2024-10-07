import AppError from "../utili/appError.js"
import { User } from '../DB/models/User.model.js'

const checkEmail=async(req,res,next)=>{
    let{email}=req.body
    const user= await User.findOne({email})
    if(user){
        next(new AppError( "u already register" , 409))
    }else{
        next()
    }

}


export{
    checkEmail
}