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
    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    },
    product: {
        type: Types.ObjectId,
        ref: "Product"
    }
}, {
    timestamps: true,
    versionKey: false
})

schema.pre(/^find/,function(){
    this.populate("createdBy","name")
})

export const Review = mongoose.model('Review', schema)