import handleError from "../../middleware/handelAsyncError.js";
import AppError from "../../utili/appError.js";
import { Cart } from "../../DB/models/cart.model.js";
import { Product } from "../../DB/models/product.model.js";
import { Order } from "../../DB/models/order.model.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Q9CVQRs8NJMQca17tLchooppuaNxOixtIlyDTRlo6n6HH1SKNVnNU8RK1795AOPgUMPLBFA9SbnjNxO1ye2Hp2Z00cmvQxk3g');





const createCachOrder = handleError(async (req, res, next) => {
  let cart=await Cart.findById(req.params.id)
  let totalPrice=cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount:cart.totalPrice;
  let order=new Order({
    user:req.user.id,
    cartItems:cart.cartItems,
    totalPrice,
    shippingAddress:req.body.shippingAddress,
  })

  if(order){
    let options= cart.cartItems.map(ele=>({
        updateOne:{
            filter:{_id:ele.product},
            update:{$inc:{quantity:-ele.quantity,sold:ele.quantity}}
        }
    }))

    await Product.bulkWrite(options)
    await order.save()
  }else{
    return next(new AppError("oder occurs",409))
  }
  await Cart.findByIdAndDelete(req.params.id)
  res.status(200).json({message:"Done",order})
})


const getOrders = handleError(async (req, res, next) => {
  let orders=await Order.find({user:req.user.id}).populate("cartItems.product")
  if(!orders) return next(new AppError("You Not Have Orders",404))
    res.status(200).json({message:"Your Orders",orders})
  })



  const onlinePayment=handleError(async(req,res,next)=>{
    let cart=await Cart.findById(req.params.id)
    let totalPrice=cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount:cart.totalPrice;
  
let session = await stripe.checkout.sessions.create({
    line_items:[{
        price_data:{
            currency:"egp",
            unit_amount:totalPrice*100,
            product_data:{
                name:req.user.name
            }
        },
        quantity:1
    }],
    mode:"payment",
    success_url:"https://github.com/abdelhamed59/E-commerce-nodeJs",
    cancel_url:"https://github.com/abdelhamed59",
    customer_email:req.user.email,
    client_reference_id:req.params.id,
    metadata:req.body.shippingAddress
})

res.status(200).json({message:"Done",session})
  })



export {
    createCachOrder,
   getOrders,
   onlinePayment
}