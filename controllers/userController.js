const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

const registerUser = asyncHandler(async(req,res) => {
    const {name, email,password} = req.body;
    if (!name || !email || !password){
        res.status(400);
        throw new Error("All Fields are mandatory");
    }
    const userAvaible = await User.findOne({email});
    if (userAvaible){
        res.status(400);
        throw new Error("User already register");
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User created ${user}`);
    if (user){
        res.status(201).json({_id:user.id, email: user.email });
    }else{
        res.status(400);
        throw new Error("User data us not valid");
    }
    res.json({message:"Register the User"})
});

const loginUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("All Fields are mandatory");
    }
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, process.env.ACCESS_TOKEN_SECERT,
        {expiresIn: "1m"}
    );
        res.status(200).json({accessToken});
    }else{
        res.status(400);
        throw new Error("Email or Password is not valid");
    }
    res.json({message:"Login the User"})
});

const currentUser = asyncHandler((req,res) => {
    res.json(req.user)
});

module.exports ={registerUser, loginUser, currentUser};