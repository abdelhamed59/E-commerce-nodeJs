import handleError from "../../middleware/handelAsyncError.js";
import AppError from "../../utili/appError.js";
import { Cart } from "../../DB/models/cart.model.js";
import { Product } from "../../DB/models/product.model.js";
import { Coupon } from "../../DB/models/coupon.model.js";


function calcPrice(cart) {
    let totalPrice = 0;
    cart.cartItems.forEach(ele => {
        totalPrice += ele.price * ele.quantity
    });
    cart.totalPrice = totalPrice
}


const addCart = handleError(async (req, res, next) => {
    let product = await Product.findById(req.body.product).select("price")
    !product && next(new AppError("Product Not Found", 404))
    req.body.price = product.price
    let isCartFound = await Cart.findOne({ user: req.user.id })
    if (!isCartFound) {
        let cart = new Cart({
            user: req.user.id,
            cartItems: [req.body]
        })
        calcPrice(cart)
        await cart.save()
        return res.status(201).json({ message: "cart created", Cart: cart })
    }
    let item = isCartFound.cartItems.find((ele) => ele.product == req.body.product)
    if (item) {
        item.quantity += 1
    } else {
        isCartFound.cartItems.push(req.body)
    }
    calcPrice(isCartFound)
    await isCartFound.save()
    res.json({ message: "your Cart", Cart: isCartFound })
})


const getCart = handleError(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user.id })
    res.status(200).json({ message: "your Cart", Cart: cart })
})


// const removeItemFromCart = handleError(async (req, res, next) => {
//     const cart = await Cart.findOne({ user: req.user.id });    
//     if (!cart) {
//         return next(new AppError("Cart not found", 404));
//     }
//     const itemToRemove = cart.cartItems.find(item => item._id === req.params.id);    
//     if (!itemToRemove) {
//         return next(new AppError("Item not found in cart", 404));
//     }
//     cart.totalPrice -= itemToRemove.price * itemToRemove.quantity;
//     cart.cartItems = cart.cartItems.filter(item => item._id.toString() !== req.params.id);
//     await cart.save();
//     res.status(200).json({ message: "Item removed from cart successfully", Cart: cart });
// });

const removeItemFromCart = handleError(async (req, res, next) => {
    let cart = await Cart.findOneAndUpdate({ user: req.user.id }, { $pull: { cartItems: { _id: req.params.id } } }, { new: true })
    calcPrice(cart)
    res.status(200).json({ message: "item removed from cart successfuly", Cart: cart })
})


const cleareCart = handleError(async (req, res, next) => {
    let cart = await Cart.findOneAndDelete({ user: req.user.id })
    res.status(200).json({ message: "Cart Deleted Successfuly", Cart: cart })
})


const updateCart = handleError(async (req, res, next) => {
    let product = await Product.findById(req.body.product).select("price")
    !product && next(new AppError("Product Not Found", 404))
    req.body.price = product.price
    let isCartFound = await Cart.findOne({ user: req.user.id })

    let item = isCartFound.cartItems.find((ele) => ele.product == req.body.product)
    !item && next(new AppError("item not found", 404))
    if (item) {
        item.quantity = req.body.quantity
    }
    calcPrice(isCartFound)
    await isCartFound.save()
    res.json({ message: "your Cart", Cart: isCartFound })
})



const applyCoupon = handleError(async (req, res, next) => {    
    let coupon = await Coupon.findOne({ code: req.body.code, expire: { $gte: Date.now() } })
    if (!coupon) return next(new AppError("opp... coupon invalid", 409))
    let cart = await Cart.findOne({ user: req.user.id })
if(coupon.type=="prec"){
     cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
    cart.discount = coupon.discount
    cart.discountType="prec"
}else if(coupon.type=="fixed"){
    cart.totalPriceAfterDiscount = cart.totalPrice - coupon.discount
    cart.discount = coupon.discount
    cart.discountType="fixed"
}
   
    await cart.save()
    res.status(200).json({ message: "Cart Deleted Successfuly", Cart: cart })
})









export {
    addCart,
    getCart,
    removeItemFromCart,
    updateCart,
    cleareCart,
    applyCoupon
}