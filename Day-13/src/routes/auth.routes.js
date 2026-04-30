const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const authRouter = express.Router()
const crypto = require("crypto");
const { log } = require("console");

authRouter.post("/register", async (req,res)=>{
    const {name, email, password} = req.body;

    const userProfileExist = await userModel.findOne({email})

    if(userProfileExist){
        return res.status(409).json({
            message: "Profile exist with this email."
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")


    const user = await userModel.create({
        name, email, password: hash
    })

    const token = jwt.sign({
        id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: `${name}'s Prifile Register Successfully`,
        user,
        token
    })
})

authRouter.post("/login", async (req,res)=>{
    const {email, password} = req.body;

    const isUserExist = await userModel.findOne({email})

    if(!isUserExist){
        return res.status(404).json({
            message: "Please enter vaild email"
        })
    }

    const ispasswordMatch =  isUserExist.password ===  crypto.createHash("md5").update(password).digest("hex")
    
    if(!ispasswordMatch){
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id: isUserExist._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token).status(200).json({
        message: "User Login Successfully"
    })

})


module.exports = authRouter;