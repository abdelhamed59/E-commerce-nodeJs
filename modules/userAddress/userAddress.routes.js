import express from 'express'

import { protectRoute } from '../../middleware/verifyToken.js'
import { addAddress, allAddresses, removeAddress } from './userAddress.controller.js'

const addressRoutes = express.Router()

addressRoutes.put("/",protectRoute,addAddress)
addressRoutes.delete("/:addressId",protectRoute,removeAddress)
addressRoutes.get("/",protectRoute,allAddresses)





export default addressRoutes