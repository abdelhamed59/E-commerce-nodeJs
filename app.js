import express from 'express'
import connection from './DB/connection.js'
import { Bootstrap } from './modules/Bootstrap.js'
import AppError from './utili/appError.js'
const app = express()
const port = 3000
app.use(express.json())

connection()

Bootstrap(app)

app.get('/', (req, res) => res.send('Hello World!'))

app.use("**",(req,res,next)=>{
    next(new AppError("invalid URL",404))
})

app.use((err, req, res, next) => {
    res.status(err.statusCode).send({message:err.message})
  })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))