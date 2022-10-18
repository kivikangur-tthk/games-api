require("dotenv").config()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const jwt = require("jsonwebtoken")
const utils = require("../utils")

exports.loginUser = async (req, res, next) => {
    let { email, password } = req.body;    
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.log("Find: ",err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
    if (!existingUser || !utils.verifyPassword(password,existingUser.password)) {
        console.log("User: ",existingUser);
        console.log("Pass: ",password);
        const error = new Error("Wrong details please check at once");
        return next(error);
    }
    let token;
    try {
        //Creating jwt token
        token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
        );
    } catch (err) {
        console.log("JWT: ",err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
    res.status(200)	
        .json({
        success: true,
        data: {
            userId: existingUser.id,
            email: existingUser.email,
            token: token,
        },
        })
}
exports.registerUser = async (req, res, next) => {
    let { name, email, password } = req.body;
    password = await utils.hashPassword(password)
    const newUser = User({
        name,
        email,
        password,
    });
    try {
        await newUser.save()
    } catch (e) {
        console.log("Save: ",e);
        const error = new Error("Error! Something went wrong.")
        return next(error)
    }
    let token;
    try {
        token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
        );
    } catch (err) {
        console.log("Token: ",err);
        const error = new Error("Error! Something went wrong.")
        return next(error);
    }
    res
        .status(201)
        .json({
        success: true,
        data: { userId: newUser.id,
            email: newUser.email, token: token },
        })
}