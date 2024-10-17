const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Create a schema for Student
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String,
  enrollmentDate: { type: Date, default: Date.now }
});

// Create a model for Student
const Student = mongoose.model('Student', studentSchema);

// POST route to add a student
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);  // Create a new Student with the body data
    const result = await student.save();  // Save the student to the database
    res.status(201).send(result);  // Send the result as response
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET route to retrieve all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();  // Fetch all students from the database
    res.status(200).send(students);  // Send the list of students as response
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
