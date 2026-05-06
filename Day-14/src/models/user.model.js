const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true, "Username alredy exist"],
        required: [true, "Username is required"]
    }, 

    email:{
        type: String,
        unique: [true, "Email already exist"],
        required: [true, "email is required"]
    },

    password:{
        type: String,
        required: [true, "password is required"]
    },

    bio: String,

    profileImg: {
    type: String,
    default: "https://ik.imagekit.io/6hc9jfe1n/download.png"
    }
})

const userModel = mongoose.model("InstaUsers", userSchema);

module.exports = userModel;