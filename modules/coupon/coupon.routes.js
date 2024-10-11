import express from 'express'
import { allowTo, protectRoute } from '../../middleware/verifyToken.js'
import { addCoupon, deleteCoupon, getCoupon, getCoupons, updateCoupon } from './coupon.controller.js'

const couponRoutes = express.Router()

couponRoutes.route("/")
    .post( protectRoute,allowTo("admin"),addCoupon)
    .get(protectRoute,getCoupons)

    couponRoutes.route("/:id")
    .put(protectRoute,allowTo("admin"),updateCoupon)
    .get( protectRoute,getCoupon)
    .delete(protectRoute,allowTo("admin"),deleteCoupon )



export default couponRoutes