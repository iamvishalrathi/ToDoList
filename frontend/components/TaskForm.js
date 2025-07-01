import { useState } from 'react';
import styles from '../styles/TaskForm.module.css';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!title.trim()) {
      setError('Task title cannot be empty');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const success = await onAddTask(title.trim());
      if (success) {
        setTitle(''); // Clear input on success
      }
    } catch (err) {
      setError('Failed to add task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className={styles.input}
          disabled={isSubmitting}
        />
        <button 
          type="submit" 
          className={styles.button}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default TaskForm;