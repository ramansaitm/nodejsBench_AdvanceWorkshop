import jwt from 'jsonwebtoken'

exports.JwtVerify =async (req,res,next)=>{
    if (req.isAuthenticated()) {
        return next();
    }else {
    const token =req.headers.auth;
    console.log(token,"raman");
    if(!token) return res.status(400).send("access denied")
    try{
    const decoded =jwt.verify(token,process.env.SECRETKEY);
    req.user=decoded;
    next();
    }catch(err)
    {
        res.status(400).send("Authentication Failed")
    }
}

}
