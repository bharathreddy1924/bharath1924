const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 🔴 PASTE YOUR ATLAS CONNECTION STRING BELOW
mongoose.connect("mongodb+srv://bharath:1924@cluster0.h9f6hsk.mongodb.net/studentdb")


.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const StudentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  mobile: String
});

const Student = mongoose.model("Student", StudentSchema);

// CREATE
app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// GET ALL
app.get("/students", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// GET BY ID
app.get("/students/:id", async (req, res) => {
  const data = await Student.findOne({id:req.params.id});
  res.json(data);
});

// UPDATE
app.put("/students/:id", async (req, res) => {
  await Student.updateOne({id:req.params.id}, req.body);
  res.json({message:"Updated"});
});

// DELETE
app.delete("/students/:id", async (req, res) => {
  await Student.deleteOne({id:req.params.id});
  res.json({message:"Deleted"});
});

app.listen(3000, ()=>{
  console.log("MongoDB API running on port 3000");
});
