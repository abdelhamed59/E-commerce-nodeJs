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

export const subCategory = mongoose.model('subCategory', schema)