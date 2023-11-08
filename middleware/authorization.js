let jwtUtil = require("../helpers/jwtUtil");

exports.verify = (req,res,next)=>{
    try {
        const data = jwtUtil.verifyToken(req.body.token);
        req.body.data = data;
        next();
    } catch (error) {
        res.status(401).send("login first");
    }
}