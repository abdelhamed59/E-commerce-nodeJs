import bcrypt from 'bcrypt'
import AppError from '../utili/appError.js'
import { User } from '../DB/models/User.model.js'


const checkPassword=async(req,res,next)=>{
let{oldPassword}=req.body
const user=await User.findById({_id:req.user.id})
if(!bcrypt.compareSync(oldPassword,user.password)){
    next(new AppError({ message: "invalid password" }, 401))

}else{
    next()
}
}

export default checkPassword