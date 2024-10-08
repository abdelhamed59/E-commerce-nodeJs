import slugify from "slugify";
import handleError from "../../middleware/handelAsyncError.js";
import { deleteOne } from "../../middleware/handler.js";
import apiFeatuers from "../../utili/apiFeatuers.js";
import { Review } from "../../DB/models/review.model.js";
import AppError from "../../utili/appError.js";


const addReview = handleError(async (req, res, next) => {
    req.body.createdBy = req.user.id
    const isReviewed = await Review.findOne({ createdBy: req.user.id, product: req.body.product })
    if (isReviewed) return next(new AppError("you already make review", 409))
    let review = await Review.insertMany(req.body)
    res.status(201).json({ message: "review added", review })
})

const getReviews = handleError(async (req, res, next) => {
    let apiFeatuer = new apiFeatuers(Review.find(), req.query).pagination().fields().filter().sort().search()
    const allreviews = await apiFeatuer.preModel
    res.status(200).json({ message: "all reviews", page: apiFeatuer.page, count: allreviews.length, allreviews })
})

const getReview = handleError(async (req, res, next) => {
    let { id } = req.params
    const review = await Review.findById(id)
    review || res.status(200).json({ message: "not found" })
    !review || res.status(200).json({ message: "success", review })
})

const updateReview = handleError(async (req, res, next) => {
    const { id } = req.params;

    const review = await Review.findOneAndUpdate(
        { _id: id, createdBy: req.user.id },
        req.body,
        { new: true, runValidators: true }
    );

    if (!review) {
        return next(new AppError("Review not found or you don't have permission to update it", 404));
    }

    res.status(200).json({ message: "success", review });
});


const deleteReview = deleteOne(Review)

export {
    addReview,
    getReview,
    getReviews,
    updateReview,
    deleteReview

}