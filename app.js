import express from 'express'
import 'dotenv/config.js'
import connection from './DB/connection.js'
import { Bootstrap } from './modules/Bootstrap.js'
import AppError from './utili/appError.js'
const app = express()
const port = 3000
app.use(express.json())
app.use("/uploads",express.static("uploads"))

connection()

Bootstrap(app)

app.get('/', (req, res) => res.send('E-commerce backend'))

app.use("**",(req,res,next)=>{
    next(new AppError("invalid URL",404))
})

app.use((err, req, res, next) => {  
    res.status(err.code).send({message:err.message,stack:err.stack})
  })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))