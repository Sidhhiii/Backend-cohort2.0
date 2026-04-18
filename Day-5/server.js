const app = require("./src/app")
const mongoose = require("mongoose")

app.listen(3000, ()=>{
    console.log("server is running")   
})

function connectDb(){
    mongoose.connect("mongodb+srv://siddhi:sjvXEtcFOrgeMHVN@cluster0.mwteyok.mongodb.net/day-5")
        .then(()=>{
            console.log("Database connected succesfully");
        })
}

connectDb();