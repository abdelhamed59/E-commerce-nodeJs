import express from 'express'
import { checkEmail } from '../../middleware/checkEmail.js'
import { hashPassword } from '../../middleware/hashPassword.js'
import { signIn, signUp } from './auth.controller.js'

const authRoutes = express.Router()

authRoutes.post("/signUp",checkEmail,hashPassword,signUp)
authRoutes.post("/signIn",signIn)


export default authRoutes