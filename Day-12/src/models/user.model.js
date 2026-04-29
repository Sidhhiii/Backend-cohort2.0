const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "user exists with this email"]   
    },
    password: String
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel