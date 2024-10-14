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
    totalPriceAfterDiscount:Number,
    paymentMethod:{
        type:String,
        enums:["cache","online"],
        default:"cache"
    },
    shippingAddress:{
        city:String,
        street:String
    },
    isPaid:Boolean,
    paidAt:Date,
    isDelivered:Boolean
}, {
    timestamps: true,
    versionKey: false
})

export const Order = mongoose.model('Order', schema)