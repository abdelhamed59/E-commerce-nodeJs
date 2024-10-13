import jwt from 'jsonwebtoken'
import { User } from "../../DB/models/User.model.js"
import handleError from "../../middleware/handelAsyncError.js"
import bcrypt from 'bcrypt'
import AppError from '../../utili/appError.js'

const signUp = handleError(async (req, res) => {
    const user = await User.insertMany(req.body)
    user[0].password = undefined
    res.status(201).json({ message: "Register Success", user })
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


export{
    signUp,
    signIn
}