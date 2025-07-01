import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';


// Use environment variable for API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks with filters
  const fetchTasks = async (filters = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      // Add filters to query params
      if (filters.completed !== undefined) params.append('completed', filters.completed);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.title) params.append('title', filters.title);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      
      const response = await axios.get(`${API_URL}/tasks?${params.toString()}`);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      setTasks([...tasks, response.data]);
      return true;
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', err);
      return false;
    }
  };

  // Update task
  const toggleTaskCompletion = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, {
        completed: !completed,
      });
      
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...response.data } : task
        )
      );
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  // Delete all tasks
  const deleteAllTasks = async () => {
    try {
      await axios.delete(`${API_URL}/tasks`);
      setTasks([]);
    } catch (err) {
      setError('Failed to delete all tasks. Please try again.');
      console.error('Error deleting all tasks:', err);
    }
  };

  // Toggle all tasks' completion status
  const toggleAllTasksCompletion = async (completed) => {
    try {
      const response = await axios.put(`${API_URL}/tasks`, { completed });
      setTasks(response.data);
    } catch (err) {
      setError(`Failed to ${completed ? 'complete' : 'uncomplete'} all tasks. Please try again.`);
      console.error('Error updating all tasks:', err);
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>To-Do List App</title>
        <meta name="description" content="A simple to-do list application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>To-Do List</h1>

        <div className={styles.grid}>
          <TaskForm onAddTask={addTask} />
          
          {error && <p className={styles.error}>{error}</p>}
          
          {loading ? (
            <p>Loading tasks...</p>
          ) : (
            <TaskList
              tasks={tasks}
              onToggleCompletion={toggleTaskCompletion}
              onDeleteTask={deleteTask}
              onDeleteAllTasks={deleteAllTasks}
              onToggleAllTasksCompletion={toggleAllTasksCompletion}
            />
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Made with{' '}
          <img
            src="https://www.svgrepo.com/show/312938/red-heart.svg"
            alt="love"
            className={styles.heartIcon}
          />{' '}
          by Vishal Kumar
        </p>
      </footer>
    </div>
  );
}