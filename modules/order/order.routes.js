import express from 'express'

import { protectRoute } from '../../middleware/verifyToken.js'
import { createCachOrder, getOrders, onlinePayment } from './order.controller.js'

const orderRoutes = express.Router()
orderRoutes.route("/:id")
.post(protectRoute,createCachOrder)


orderRoutes.post("/checkOut/:id",protectRoute,onlinePayment)
orderRoutes.get("/",protectRoute,getOrders)


export default orderRoutes