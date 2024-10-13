import handleError from "../../middleware/handelAsyncError.js";
import { User } from "../../DB/models/user.model.js";

const addAddress = handleError(async (req, res, next) => {
    const address = await User.findOneAndUpdate(
        { _id:req.user.id },
        {$addToSet:{addresses:req.body}},
        { new: true, runValidators: true }
    );
    res.status(200).json({ message: "success", address:address.addresses });
});

const removeAddress = handleError(async (req, res, next) => {
    const { addressId } = req.params;
    const address = await User.findOneAndUpdate(
        { _id:req.user.id },
        {$pull:{addresses:{_id:addressId}}},
        { new: true, runValidators: true }
    );    
    res.status(200).json({ message: "success", address });
});

const allAddresses = handleError(async (req, res, next) => {
    const address = await User.findOne({_id:req.user.id}).select("addresses");
    res.status(200).json({ message: "success", address });
});



export {
    addAddress,
    removeAddress,
    allAddresses
}