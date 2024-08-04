const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name:String,
    username:String,
    password:String,
    role:String,
    tokens:[String]
});


userSchema.pre('save',async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});


userSchema.methods.generateAuthToken = async function() {
    try{
        const token = jwt.sign({id:this._id}, process.env.SECRET_KEY);
        this.tokens.push(token);
        await this.save();  
        return token;
    }
    catch(err){
        return err
        console.log(err)
    }
  };
  
  // Method to remove a token (e.g., for logout)
//   userSchema.methods.removeAuthToken = async function(token) {
//     this.tokens = this.tokens.filter(t => t !== token);
//     return await this.save();
//   };

const user = mongoose.model('USER',userSchema);

module.exports = user;