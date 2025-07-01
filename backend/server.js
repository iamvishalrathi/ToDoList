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

// Valid priority levels
const PRIORITY_LEVELS = ['low', 'medium', 'high'];

// Helper function to validate priority
const isValidPriority = (priority) => {
  return PRIORITY_LEVELS.includes(priority);
};

// Helper function to find task by ID
const findTaskById = (id) => {
  return tasks.find(task => task.id === parseInt(id));
};

// GET /tasks - Fetch all tasks with filtering and sorting
app.get('/tasks', (req, res) => {
  const { completed, title, priority, sortBy } = req.query;
  
  let filteredTasks = [...tasks];
  
  // Filter by completion status
  if (completed !== undefined) {
    const isCompleted = completed === 'true';
    filteredTasks = filteredTasks.filter(task => task.completed === isCompleted);
  }
  
  // Filter by title search
  if (title) {
    filteredTasks = filteredTasks.filter(task => 
      task.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  
  // Filter by priority
  if (priority && isValidPriority(priority)) {
    filteredTasks = filteredTasks.filter(task => task.priority === priority);
  }
  
  // Sort tasks
  if (sortBy) {
    switch(sortBy) {
      case 'dueDate':
        filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      case 'createdAt':
        filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
    }
  }
  
  res.json(filteredTasks);
});

// POST /tasks - Add a new task
app.post('/tasks', (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  
  // Validation
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Task title is required' });
  }
  
  if (priority && !isValidPriority(priority)) {
    return res.status(400).json({ error: 'Invalid priority level' });
  }
  
  if (dueDate && isNaN(Date.parse(dueDate))) {
    return res.status(400).json({ error: 'Invalid due date format' });
  }
  
  const newTask = {
    id: nextId++,
    title,
    description: description || '',
    priority: priority || 'medium',
    dueDate: dueDate || null,
    completed: false,
    createdAt: new Date()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update task completion status
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed, title, description, priority, dueDate } = req.body;
  
  const task = findTaskById(id);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  // Validate inputs
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed status must be a boolean' });
  }
  
  if (priority && !isValidPriority(priority)) {
    return res.status(400).json({ error: 'Invalid priority level' });
  }
  
  if (dueDate && isNaN(Date.parse(dueDate))) {
    return res.status(400).json({ error: 'Invalid due date format' });
  }
  
  // Update task fields
  if (completed !== undefined) task.completed = completed;
  if (title) task.title = title;
  if (description !== undefined) task.description = description;
  if (priority) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate;
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