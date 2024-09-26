import mongoose, { Types } from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        minLength: [2, 'too short name']
    },
    email: {
        type: String,
        require: true,
        unique:true

    },
    password: String,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
}, {
    timestamps:true,
    versionKey:false
})

export const User = mongoose.model('User', schema)