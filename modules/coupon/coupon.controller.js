import handleError from "../../middleware/handelAsyncError.js";
import { deleteOne } from "../../middleware/handler.js";
import apiFeatuers from "../../utili/apiFeatuers.js";
import AppError from "../../utili/appError.js";
import { Coupon } from "../../DB/models/coupon.model.js";
import QRCode from 'qrcode'


const addCoupon = handleError(async (req, res, next) => {
    if (req.body.expire) {
        const [day, month, year] = req.body.expire.split("/");
        req.body.expire = new Date(`${year}-${month}-${day}`);
        if (isNaN(req.body.expire)) {
            return next(new AppError("Invalid date format for expire. Use DD/MM/YYYY.", 400));
        }
    }

    req.body.user = req.user.id;
    const coupon = await Coupon.insertMany(req.body);
    res.status(201).json({ message: "Coupon created", coupon });
});


const getCoupons = handleError(async (req, res, next) => {
    let apiFeatuer = new apiFeatuers(Coupon.find(), req.query).pagination().fields().filter().sort().search()
    const allCoupons = await apiFeatuer.preModel
    res.status(200).json({ message: "all coupons", page: apiFeatuer.page, count: allCoupons.length, allCoupons })
})

const getCoupon = handleError(async (req, res, next) => {
    let { id } = req.params
    const coupon = await Coupon.findById(id)
    let QR = await QRCode.toDataURL(coupon.code)
    coupon || res.status(200).json({ message: "not found" })
    !coupon || res.status(200).json({ message: "success", coupon, QR })
})

const updateCoupon = handleError(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.type === "prec") {
        if (typeof req.body.discount === "number" && req.body.discount >= 0 && req.body.discount <= 100) {
            req.body.discount = req.body.discount;
        } else {
            return next(new AppError("Invalid discount value for percentage type", 400));
        }
    }
    const coupon = await Coupon.findOneAndUpdate(
        { _id: id, user: req.user.id },
        req.body,
        { new: true, runValidators: true }
    );

    if (!coupon) {
        return next(new AppError("Review not found or you don't have permission to update it", 404));
    }


    res.status(200).json({ message: "coupon updated successfuly", coupon });
});


const deleteCoupon = deleteOne(Coupon)

export {
    addCoupon,
    getCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon

}