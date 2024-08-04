const jwt = require("jsonwebtoken");
const user = require('../model/userSchema');

const UserVerify =  async (req,res,next) => {
    try{
        const token = req.cookies.authToken;
        const UserVerify = jwt.verify(token,process.env.SECRET_KEY);
        const user_ = await user.findOne({_id:UserVerify.id});
        console.log(user_)
        next();
    }
    catch(err){
        console.log(err)
        res.status(401).send(err);
    }
}

module.exports = UserVerify;