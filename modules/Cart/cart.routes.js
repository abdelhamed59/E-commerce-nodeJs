import express from 'express'

import { protectRoute } from '../../middleware/verifyToken.js'
import { addCart, applyCoupon, cleareCart, getCart, removeItemFromCart, updateCart } from './cart.controller.js'

const cartRoutes = express.Router()

cartRoutes.route("/")
    .post( protectRoute,addCart)
    .get(protectRoute,getCart)
    .put(protectRoute,updateCart)
    .delete( protectRoute,cleareCart)
    cartRoutes.route("/:id")
    .delete( protectRoute,removeItemFromCart)

    cartRoutes.post("/apply-coupon",protectRoute,applyCoupon)



export default cartRoutes