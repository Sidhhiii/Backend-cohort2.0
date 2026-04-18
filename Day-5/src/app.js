const express = require("express");

const app = express();

app.use(express.json())

const students = [];

app.post("/students",(req, res)=>{
    students.push(req.body);

    res.status(201).json({
        message : "Student data is created successfully"
    })
})

app.get("/students", (req,res)=>{
    res.status(200).json({
        students: students
    })
})

app.patch("/students/:index", (req,res) =>{
    // students[req.params.index].name = req.body.name;
    // students[req.params.index].Batch = req.body.Batch;

    
    students[req.params.index] = req.body;

    res.status(200).json({
        "message": "Data updated suceesfully"
    })
})

app.delete("/students/:index", (req, res)=>{
    delete students[req.params.index];

    res.status(204)
})

app.put("/students/:index", (req, res)=>{
    students[req.params.index] = req.body;

    res.status(201).json({
        "message":"Data replaced succesfully"
    })
})


module.exports = app;