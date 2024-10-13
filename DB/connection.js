import mongoose from "mongoose"

  const connection=()=>{
    mongoose.connect(process.env.DB_ONLINE_CONNECTION)
    .then(()=>console.log("connect to mongoose"))
    .catch((err)=>console.log(err))
}

export default connection