const mongoose = require('mongoose');
const { Schema } = mongoose;

const carSchema = new Schema({
    id:Number,
    name:String,
    year:Date,
    price:Number
});



const cars = mongoose.model('cars',carSchema);

module.exports = cars;