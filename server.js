const express = require("express");
const app = express();

app.use(express.json());

// In-memory storage
let students = [];

/**
 * CREATE student
 */
app.post("/students", (req, res) => {
  const { id, name, mobile } = req.body;

  // validation
  if (id === undefined || !name || !mobile) {
    return res.status(400).json({ message: "id, name and mobile are required" });
  }

  const numericId = Number(id);

  const exists = students.find(s => s.id === numericId);
  if (exists) {
    return res.status(400).json({ message: "Student already exists" });
  }

  const student = { id: numericId, name, mobile };
  students.push(student);

  res.status(201).json(student);
});

/**
 * GET all students
 */
app.get("/students", (req, res) => {
  res.json(students);
});

/**
 * GET student by ID
 */
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

/**
 * UPDATE student
 */
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  // partial update
  if (req.body.name !== undefined) {
    student.name = req.body.name;
  }

  if (req.body.mobile !== undefined) {
    student.mobile = req.body.mobile;
  }

  res.json(student);
});

/**
 * DELETE student
 */
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);
  res.json({ message: "Student deleted" });
});

app.listen(3000, () => {
  console.log("In-memory API running on port 3000");
});