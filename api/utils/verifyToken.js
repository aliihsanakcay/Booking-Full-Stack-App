import jwt from "jsonwebtoken";
import { createError } from "./error.js";

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    // console.log("xxxxxxxxxxxx => ", token)
    
    if(!token) return next(createError(401, "You are not authenticated!"));

    // console.log(" yyyyyyyyyyyyyyyyyyyyyyyy ")
    
    jwt.verify(token, process.env.JWT, (error, user) => {
        if(error) return next(createError(403, "Token is not valid!"));
        req.user = user;
        // console.log("user => ", user)
        next();
    });
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return next(createError(403, "You are not authorized!"));
        }
    });
};

// next sorunsalı ?????????????? 
// next yazaarsan console u yazdırmıyor dire atlıyor
// next yazmazsan verifyToken da next olan errorları atlıyor 
// NE YAPMAK GEREKİYOR ????????????
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // console.log("asssssssssssss => ", req.user)
        if(req.user.isAdmin){
            next();
        }else{
            return next(createError(403, "You are not authorized!"));
        }
    });
};

export {verifyToken, verifyUser, verifyAdmin};