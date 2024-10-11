import mongoose, { Types } from "mongoose";

const schema = mongoose.Schema({
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    cartItems: [{
        product: {
            type: Types.ObjectId,
            ref: "Product"
        },
        quantity:{
            type:Number,
            default:1
        },
        price:Number
    }],
    totalPrice:Number,
    discount:Number,
    discountType:{
        type:String,
        enums:["prec","fixed"]
    },
    totalPriceAfterDiscount:Number
}, {
    timestamps: true,
    versionKey: false
})

export const Cart = mongoose.model('Cart', schema)