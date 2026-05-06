
const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

async function registerController(req, res){
    const {username, email, password, bio, profileImg } = req.body

    const isUserAlredyExist =  await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(isUserAlredyExist){
        return res.status(409).json({
            message: `User already exist ${(isUserAlredyExist.email== email)? "with this email" : "with this username."}`
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImg,
        password: hash
    })

    const token = jwt.sign(
        {id:user._id}, 
        process.env.JWT_TOKEN,
        {expiresIn: "1d"}
    )

    res.cookie("token", token).status(201).json({
        message: "User register Successfully",
        user:{
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImg: user.profileImg
        }
    })

}

async function loginController(req, res){
    const {username, email, password} = req.body;

    const isUserExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    const hash = crypto.createHash('sha256').update(password).digest("hex")

    if(isUserExist.password != hash){
        return res.status(409).json({
            message: "Please provide vaild password"
        })
    }

    const token = jwt.sign(
        {id: isUserExist._id},
        process.env.JWT_TOKEN,
        {expiresIn: "1d"}
    )

    res.cookie("token", token).status(200).json({
        message: "User login successfully",
        user:{
            username: isUserExist.username,
            email: isUserExist.email
        }
    })
}

module.exports = {
    registerController,
    loginController
}