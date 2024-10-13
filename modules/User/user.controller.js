import handleError from "../../middleware/handelAsyncError.js";
import { deleteOne } from "../../middleware/handler.js";
import apiFeatuers from "../../utili/apiFeatuers.js";
import { User } from "../../DB/models/user.model.js";


const addUser = handleError(async (req, res, next) => {
    let user = await User.insertMany(req.body)
    res.status(201).json({ message: "User added", user })
})

const getUsers = handleError(async (req, res, next) => {
    let apiFeatuer= new apiFeatuers(User.find(),req.query).pagination().fields().filter().sort().search()
    const allUsers =await apiFeatuer.preModel
    res.status(200).json({ message: "all Users",page:apiFeatuer.page, count: allUsers.length, allUsers })
})

const getUser = handleError(async (req, res, next) => {
    let { id } = req.params
    const user = await User.findById(id)
    user || res.status(200).json({ message: "not found" })
    !user || res.status(200).json({ message: "success", user })
})

const updateUser = handleError(async (req, res, next) => {
    let { id } = req.params
        const user = await User.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json({ message: "success", user })
})

const deleteUser =deleteOne(User)


const changePassword = handleError(async (req, res, next) => {
    let { id } = req.params
    req.body.changePasswordAt=Date.now()
        const user = await User.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json({ message: "success", user })
})

export {
   addUser,
   getUser,
   getUsers,
   updateUser,
   deleteUser,
   changePassword
}