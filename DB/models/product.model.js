import mongoose, { Types } from "mongoose";

const schema = mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'name should be unique'],
        trim: true,
        require: true,
        minLength: [2, 'too short name']
    },
    description: {
        type: String,
        trim: true,
        require: true,
        minLength: [20, 'too short name']
    },
    slug: {
        type: String,
        Lowercase: true,
        require: true

    },
    imageCover:String,
    images:[String],
    price:{
        type:Number,
        require:true,
        min:0
    },
    quantity:{
        type:Number,
        require:true,
        default:0
    },
    priceAfterDiscount:{
        type:Number,
        min:0
    },
    sold:{
        type:Number,
        default:0,
        require:true
    },
    stock:{
        type:Number,
        min:0
    },
    rateCount:Number,
    rateAvg:Number,
    rate:{
        type:Number,
        min:0,
        max:5
    },
    category: {
        type: Types.ObjectId,
        ref: "Category"
    },
    brand: {
        type: Types.ObjectId,
        ref: "Brand"
    },
    subCategory: {
        type: Types.ObjectId,
        ref: "subCategory"
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps:true,
    versionKey:false
})

export const Product = mongoose.model('Product', schema)