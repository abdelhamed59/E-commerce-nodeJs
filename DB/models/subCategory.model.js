import mongoose, { Types } from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name should be unique'],
        trim: true,
        require: true,
        minLength: [2, 'too short name']
    },
    slug: {
        type: String,
        Lowercase: true,
        require: true

    },
    image:String,
    category:{
        type:Types.ObjectId,
        ref:"Category"
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps:true,
    versionKey:false
})
schema.post("init",function(doc){
    doc.image=process.env.BASEURL+"uploads/"+doc.image
})
export const subCategory = mongoose.model('subCategory', schema)