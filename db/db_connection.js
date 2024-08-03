const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const DB = process.env.MONGO_URL
console.log(DB)
mongoose.connect(DB).then(()=>{
    console.log("Database connection successfull")
}).catch((e) =>{
    console.log(e)
})