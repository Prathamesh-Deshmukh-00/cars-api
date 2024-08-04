const jwt = require("jsonwebtoken");
const user = require('../model/userSchema');

const AdminVerify =  async (req,res,next) => {
    try{
        const token = req.cookies.authToken;
        const UserVerify = jwt.verify(token,process.env.SECRET_KEY);
        const user_ = await user.findOne({_id:UserVerify.id});
        if (user_.role == "admin"){
            next();
        }
        else{
            res.status(401).send({"message":"Admin verfication unsuccessfull"});
        }
    }
    catch(err){
        res.status(401).send(err);
    }
}

module.exports = AdminVerify;