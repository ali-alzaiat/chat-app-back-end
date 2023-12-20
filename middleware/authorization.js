let jwtUtil = require("../helpers/jwtUtil");

exports.verify = (req,res,next)=>{
    try {
        const data = jwtUtil.verifyToken(req.headers.authorization?.split(' ')[1]);
        req.body.data = data;
        next();
    } catch (error) {
        res.status(401).send("login first");
    }
}