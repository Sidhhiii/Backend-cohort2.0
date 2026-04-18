const express = require("express");
const mangoose = require("mongoose");
const cors = require('cors');
const path = require('path')
const noteModel = require("./models/note.model");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("./public"))

// post api creation
app.post("/api/notes", async (req, res)=>{
    const {title, description} = req.body;

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "note created successfully",
        note
    })
    
})


// fetching all the notes
app.get("/api/notes", async (req, res) =>{
    const notes = await noteModel.find();

    res.status(200).json({
        message: "All notes fetch successfully",
        notes
    })
})

//deleting particular note 
app.delete("/api/notes/:id", async(req, res)=>{
    await noteModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "Note deleted successfully"
    })
})


//updating existing note
app.patch("/api/notes/:id", async (req, res)=>{
    const {title, description} = req.body;
    
    await noteModel.findByIdAndUpdate(req.params.id,{ 
        title,
        description
    });

    res.status(200).json({
        message: "Note Modified successfully"
    })
})

app.use('*name', (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})


module.exports = app;
