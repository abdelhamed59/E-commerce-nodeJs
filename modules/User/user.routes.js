import express from 'express'
import { addUser, changePassword, deleteUser, getUser, getUsers, updateUser } from './user.controller.js'
import { checkEmail } from '../../middleware/checkEmail.js'
import { hashPassword } from '../../middleware/hashPassword.js'

const userRoutes = express.Router()

userRoutes.route("/")
    .post(checkEmail,hashPassword,addUser)
    .get(getUsers)

    userRoutes.route("/:id")
    .put(updateUser)
    .get( getUser)
    .delete( deleteUser)

userRoutes.put("/cahngePassword/:id",hashPassword,changePassword)

export default userRoutes