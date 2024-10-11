import mongoose, { Types } from "mongoose";

const schema = mongoose.Schema({
    name: {
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
    versionKey:false,
    toJSON:{virtuals:true}
})


schema.post("init",function(doc){
    doc.imageCover=process.env.BASEURL+"uploads/"+doc.imageCover;
   if(doc.images) doc.images=doc.images.map(ele=>process.env.BASEURL+"uploads/"+ele)
})

schema.virtual("reviews",{
    ref:"Review",
    localField:"_id",
    foreignField:"product"
})
schema.pre(/^find/,function(){
    this.populate("reviews")
})

export const Product = mongoose.model('Product', schema)