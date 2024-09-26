import mongoose, { Types } from "mongoose";

const schema = mongoose.Schema({
    comment: {
        type: String,
        trim: true,
        minLength: [2, 'too short name']
    },
    rate: {
        type: Number,
        require: true,
        min: 0,
        max: 5
    },
    userId: {
        type: Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: Types.ObjectId,
        ref: "Product"
    }
}, {
    timestamps: true,
    versionKey: false
})

export const Review = mongoose.model('Review', schema)