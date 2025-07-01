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

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
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
  const addTask = async (title) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, { title });
      setTasks([...tasks, response.data]);
      return true;
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', err);
      return false;
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, {
        completed: !completed,
      });
      
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !completed } : task
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
            />
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>MERN Stack To-Do List Application</p>
      </footer>
    </div>
  );
}