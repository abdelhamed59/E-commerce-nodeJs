import express from 'express'
import { checkEmail } from '../../middleware/checkEmail.js'
import { hashPassword } from '../../middleware/hashPassword.js'
import { changePassword, getOTP, resetPassword, signIn, signUp } from './auth.controller.js'
import { protectRoute } from '../../middleware/verifyToken.js'
import checkPassword from '../../middleware/checkPassword.js'

const authRoutes = express.Router()

authRoutes.post("/signUp",checkEmail,hashPassword,signUp)
authRoutes.post("/signIn",signIn)
authRoutes.put("/changePassword",protectRoute,checkPassword,changePassword)
authRoutes.post("/forgetPassword",getOTP)
authRoutes.post("/resetPassword",resetPassword)



export default authRoutes