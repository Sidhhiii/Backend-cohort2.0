const express = require("express")

const app = express();

app.get("/", (req, res)=>{
    res.send("hi there..........")
})

app.get("/home", (req, res)=>{
    res.send("welcome homee")
})

app.get("/contact", (req, res)=>{
    res.send("contact page")
})

app.listen(3000);
