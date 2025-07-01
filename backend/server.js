const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store
let tasks = [];
let nextId = 1;

// Helper function to find task by ID
const findTaskById = (id) => {
  return tasks.find(task => task.id === parseInt(id));
};

// GET /tasks - Fetch all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks - Add a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  
  // Validation
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Task title is required' });
  }
  
  const newTask = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update task completion status
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  
  const task = findTaskById(id);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed status must be a boolean' });
  }
  
  task.completed = completed;
  res.json(task);
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json(deletedTask);
});

// DELETE /tasks - Delete all tasks
app.delete('/tasks', (req, res) => {
  const count = tasks.length;
  tasks = [];
  res.json({ message: `${count} tasks deleted successfully` });
});

// PUT /tasks - Update all tasks' completion status
app.put('/tasks', (req, res) => {
  const { completed } = req.body;
  
  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed status must be a boolean' });
  }
  
  tasks = tasks.map(task => ({
    ...task,
    completed
  }));
  
  res.json(tasks);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});