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
      document.getElementById('title').focus();
      return;
    }

    // Validate due date
    if (!formData.dueDate) {
      setError('Due date is required');
      document.getElementById('dueDate').focus();
      return;
    }
    if (isNaN(Date.parse(formData.dueDate))) {
      setError('Invalid due date');
      document.getElementById('dueDate').focus();
      return;
    }

    // Check if due date is in the past
    const selectedDate = new Date(formData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('Due date cannot be in the past');
      document.getElementById('dueDate').focus();
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <div className={styles.formRow}>
            <div className={styles.inputWrapper}>
              <label htmlFor="title" className={styles.label}>
                Task Title <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter task title"
                className={styles.input}
                required
                aria-required="true"
                autoFocus
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.inputWrapper}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter task description"
                className={styles.textarea}
                rows="3"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.inputWrapper}>
              <label htmlFor="priority" className={styles.label}>
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className={styles.select}
                aria-label="Task priority"
                disabled={isSubmitting}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="dueDate" className={styles.label}>
                Due Date <span className={styles.required}>*</span>
              </label>
              <input
                type="datetime-local"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={styles.dateInput}
                required
                aria-required="true"
                min={new Date().toISOString().slice(0, 16)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="submit"
              className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  Adding...
                </>
              ) : 'Add Task'}
            </button>
          </div>
        </div>
      </form>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  );
};

export default TaskForm;