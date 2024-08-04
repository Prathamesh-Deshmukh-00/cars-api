const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const cors = require("cors");
const cookieParser = require('cookie-parser');
var path = require('path');
require('./db/db_connection');
dotenv.config();

const app = express();
app.use(bodyParser.json())
app.use(cors({origin:true,credentials:true}));
app.use(cookieParser());
app.use(express.json())
app.use(require('./router/auth'));
app.use(express.static(path.resolve(__dirname,'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT ,()=>{
    console.log(`Server is running on port : ${PORT}`)
})