import styles from '../styles/TaskItem.module.css';

const TaskItem = ({ task, onToggleCompletion, onDeleteTask }) => {
  const { id, title, description, priority, dueDate, completed, createdAt } = task;

  // Truncate
  const truncate = (text, limit = 100) =>
    text.length > limit ? text.substring(0, limit) + '...' : text;

  // Format due date
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  // Handle delete click
  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete the task "${truncate(title, 10)}"?`)) {
      onDeleteTask(id);
    }
  };

  return (
    <li className={`${styles.item} ${completed ? styles.completed : ''}`}>
      <div className={styles.taskContent}>
        <div className={styles.mainContent}>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleCompletion(id, completed)}
            className={styles.checkbox}
            id={`task-${id}`}
          />
          <div className={styles.taskDetails}>
            <div className={styles.titleRow}>
              <label
                htmlFor={`task-${id}`}
                className={`${styles.title} ${completed ? styles.titleCompleted : ''}`}
              >
                {truncate(title, 50)}
              </label>
              <span className={`${styles.priority} ${styles[priority]}`}>
                {priority}
              </span>
            </div>
            {description && (
              <p className={styles.description}>
                {truncate(description, 50)}
              </p>
            )}
            {(dueDate || createdAt) && (
              <p className={styles.dueDate}>
                {dueDate && <>Due: {formatDate(dueDate)}</>}
                {dueDate && createdAt && ' • '}
                {createdAt && <>Created: {formatDate(createdAt)}</>}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          onClick={() => alert(`Task Details:\n\nTitle: ${title}\nDescription: ${description || 'None'}\nPriority: ${priority}\nDue Date: ${formatDate(dueDate)}\nCreated: ${formatDate(createdAt)}\nStatus: ${completed ? 'Completed' : 'Active'}`)}
          className={styles.viewButton}
          aria-label="View task details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.eyeIcon}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </button>
        <button
          onClick={handleDeleteClick}
          className={styles.deleteButton}
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>

    </li>
  );
};

export default TaskItem;