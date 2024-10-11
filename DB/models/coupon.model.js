import mongoose, { Types } from "mongoose";

const schema = mongoose.Schema({
    code: {
        type: String,
        trim: true,
        unique:true
    },
    expire:Date,
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },
    discount: {
        type: Number,
        min: 1,
        require:true
    },
    type:{
        type:String,
        enum:["prec","fixed"],
        default:"fixed"
    },
    user: {
        type: Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
    versionKey: false
})

export const Coupon = mongoose.model('Coupon', schema)