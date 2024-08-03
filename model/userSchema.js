const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcryptjs")


const userSchema = new Schema({
    name:String,
    username:String,
    password:String,
    role:String
});


userSchema.pre('save',async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const user = mongoose.model('USER',userSchema);

module.exports = user;