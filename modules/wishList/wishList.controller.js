import handleError from "../../middleware/handelAsyncError.js";
import { User } from "../../DB/models/user.model.js";

const addToWishList = handleError(async (req, res, next) => {
    const { product } = req.params;

    const wishList = await User.findOneAndUpdate(
        { _id:req.user.id },
        {$addToSet:{wishList:product}},
        { new: true, runValidators: true }
    );
    res.status(200).json({ message: "success", wishList });
});

const removeFromWishList = handleError(async (req, res, next) => {
    const { product } = req.params;

    const wishList = await User.findOneAndUpdate(
        { _id:req.user.id },
        {$pull:{wishList:product}},
        { new: true, runValidators: true }
    );
    res.status(200).json({ message: "success", wishList });
});

const allWishList = handleError(async (req, res, next) => {
    const wishList = await User.findOne({_id:req.user.id}).select("wishList").populate("wishList");
    res.status(200).json({ message: "success", wishList });
});



export {
    addToWishList,
    removeFromWishList,
    allWishList
}