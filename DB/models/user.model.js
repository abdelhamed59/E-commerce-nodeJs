import mongoose, { Types } from "mongoose";

const schema = mongoose.Schema({
    name:{
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
    password:{
        type:String,
        require:true
    },
    changePasswordAt:Date,
    phoneNumber:String,
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
    },
    OTP:{
        type: String,
    },
    wishList:[{
        type:Types.ObjectId,
        ref:"Product"
    }],
    addresses:[{
            country:String,
            city:String,
            street:String,
    }]
}, {
    timestamps:true,
    versionKey:false
})



export const User = mongoose.model('User', schema)