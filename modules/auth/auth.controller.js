import jwt from 'jsonwebtoken'
import { User } from "../../DB/models/user.model.js"
import handleError from "../../middleware/handelAsyncError.js"
import bcrypt from 'bcrypt'
import AppError from '../../utili/appError.js'
import sendEmail from '../../utili/sendEmail.js'

const signUp = handleError(async (req, res) => {
    let {email}=req.body
    const user = await User.insertMany(req.body)
    user[0].password = undefined
    const code = Math.floor(100000000 + Math.random() * 900000000);
    user[0].OTP = code;
    sendEmail(code, email)
    await user[0].save()
    res.status(200).json({ message: "please check your email for verify it" })
})
const verifyEmail=handleError(async(req,res,next)=>{
    let {code}=req.body
    const user=await User.findOne({OTP:code})
    if(!user) return next(new AppError("invalid code ",401))
        user.confirmEmail=true
    user.OTP=undefined
    await user.save()
    res.status(201).json({ message: "register success" })
})

const signIn = handleError(async (req, res, next) => {
    let{email,password}=req.body
    const user = await User.findOne({email})
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user._id, role: user.role, name: user.name ,email:user.email}, "auth")
        res.status(200).json({ message: "wellcom", token })
    } else {
        next(new AppError( "invalid email or password", 404))
    }

})

const changePassword = handleError(async (req, res) => {
    req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 8)
    const user = await User.findByIdAndUpdate({ _id: req.user.id }, { password: req.body.newPassword })
    res.status(200).json({ message: "password updated" })
})


const getOTP = handleError(async (req, res,next) => {
    let { email } = req.body;
    const code = Math.floor(100000000 + Math.random() * 900000000);
    const user = await User.findOne({ email })
    if (!user) {
        next(new AppError( "accunt not found" , 404))
    } else {
        user.OTP = code;
        sendEmail(code, email)
        await user.save()
        res.status(200).json({ message: "check your email for OTP" })

    }

})
const resetPassword = handleError(async (req, res,next) => {
    let { OTP, newPassword } = req.body;
    const user = await User.findOne({ OTP })
    if (!user) {
        next(new AppError("invalid OTP", 404))
    } else {

        user.password = bcrypt.hashSync(newPassword, 8)
        user.OTP = undefined
        await user.save()
        res.status(200).json({ message: "success please signIn" })

    }

})


export{
    signUp,
    signIn,
    changePassword,
    getOTP,
    resetPassword,
    verifyEmail
}