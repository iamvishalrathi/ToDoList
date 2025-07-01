import { useState } from 'react';
import styles from '../styles/TaskForm.module.css';

const TaskForm = ({ onAddTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!formData.title.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    // Validate due date
    if (!formData.dueDate) {
      setError('Due date is required');
      return;
    }
    if (isNaN(Date.parse(formData.dueDate))) {
      setError('Invalid due date');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const success = await onAddTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        dueDate: formData.dueDate || null
      });
      if (success) {
        setFormData({
          title: '',
          description: '',
          priority: 'medium',
          dueDate: ''
        }); // Clear form on success
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
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Add a new task..."
            className={styles.input}
            disabled={isSubmitting}
          />
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Add description (optional)"
            className={styles.textarea}
            disabled={isSubmitting}
          />
          <div className={styles.formRow}>
            <div className={styles.inputWrapper}>
              <label htmlFor="priority" className={styles.label}>Priority</label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className={styles.select}
                disabled={isSubmitting}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="dueDate" className={styles.label}>Due Date</label>
              <input
                id="dueDate"
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={styles.dateInput}
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          <button 
            type="submit" 
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default TaskForm;