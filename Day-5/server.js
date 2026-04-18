require('dotenv').config();
const app = require("./src/app")
const mongoose = require("mongoose")

app.listen(3000, ()=>{
    console.log("server is running")   
})

function connectDb(){
    mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("Database connected succesfully");
        })
}

connectDb();