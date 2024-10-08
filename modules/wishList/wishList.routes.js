import express from 'express'

import { protectRoute } from '../../middleware/verifyToken.js'
import { addToWishList, allWishList, removeFromWishList } from './wishList.controller.js'

const wishListRoutes = express.Router()

wishListRoutes.put("/:product",protectRoute,addToWishList)
wishListRoutes.delete("/:product",protectRoute,removeFromWishList)
wishListRoutes.get("/",protectRoute,allWishList)





export default wishListRoutes