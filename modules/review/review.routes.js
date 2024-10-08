import express from 'express'

import { addReview, deleteReview, getReview, getReviews, updateReview } from './review.controller.js'
import { protectRoute } from '../../middleware/verifyToken.js'

const reviewRoutes = express.Router()

reviewRoutes.route("/")
    .post( protectRoute,addReview)
    .get(getReviews)

    reviewRoutes.route("/:id")
    .put(protectRoute,updateReview)
    .get( getReview)
    .delete( deleteReview)



export default reviewRoutes