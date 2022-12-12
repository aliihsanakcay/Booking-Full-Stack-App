import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../utils/error.js";

const register = async (req,res, next) => {
    try {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch (error) {
        next(error);        
    }
};

const login = async (req,res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) return next(createError(400, "Wrong username or password!"));

        const token = await jwt.sign({ id: user._id, username: user.username, isAdmin: user.isAdmin }, process.env.JWT);

        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {httpOnly: true}).status(200).json(otherDetails);
    } catch (error) {
        next(error);        
    }
};

export {register, login};