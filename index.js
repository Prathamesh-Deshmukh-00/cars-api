const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")

require('./db/db_connection');

const app = express();
app.use(bodyParser.json())
app.use(require('./router/auth'));
dotenv.config();

const PORT = process.env.PORT || 5000;

// app.get("/", (req,res)=>{
//     res.send("Hello from Home")
// })

app.listen(PORT ,()=>{
    console.log(`Server is running on port : ${PORT}`)
})