import express from 'express'
import 'dotenv/config.js'
import connection from './DB/connection.js'
import { Bootstrap } from './modules/Bootstrap.js'
import AppError from './utili/appError.js'
import cors from 'cors'
import handleError from './middleware/handelAsyncError.js'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Q9CVQRs8NJMQca17tLchooppuaNxOixtIlyDTRlo6n6HH1SKNVnNU8RK1795AOPgUMPLBFA9SbnjNxO1ye2Hp2Z00cmvQxk3g');

const app = express()
const port = 3000

app.post('/order/webhook', express.raw({ type: 'application/json' }), handleError((req, res) => {
  const signature = req.headers['stripe-signature'].toString();
  let event = stripe.webhooks.constructEvent(
    req.body,
    signature,
    "whsec_Lte15zTUkBXLmmG5C4mZi6gSPpB4ZU30"
  );
let checkout
if(event.type=="checkout.session.completed"){
  checkout = event.data.object;
}
  res.status(200).json({message:"success",checkout});
}));
app.use(express.json())
app.use(cors())

app.use("/uploads", express.static("uploads"))

connection()

Bootstrap(app)

app.get('/', (req, res) => res.send('E-commerce backend'))

app.use("**", (req, res, next) => {
  next(new AppError("invalid URL", 404))
})

app.use((err, req, res, next) => {
  res.status(err.code).send({ message: err.message, stack: err.stack })
})
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))