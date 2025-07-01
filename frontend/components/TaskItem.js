import styles from '../styles/TaskItem.module.css';
import { useModal } from './ModalProvider';

const TaskItem = ({ task, onToggleCompletion, onDeleteTask }) => {
  const { openModal, closeModal } = useModal();
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
  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    onDeleteTask(id);
    closeModal();
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
          onClick={() => openModal({
            title: "Task Details",
            content: (
              <div className={styles.taskDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Title:</span>
                  <span className={styles.detailValue}>{title}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Description:</span>
                  <span className={styles.detailValue}>{description || 'None'}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Priority:</span>
                  <span className={`${styles.priority} ${styles[priority]}`}>{priority}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Due Date:</span>
                  <span className={styles.detailValue}>{formatDate(dueDate)}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Created:</span>
                  <span className={styles.detailValue}>{formatDate(createdAt)}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Status:</span>
                  <span className={styles.detailValue}>{completed ? 'Completed' : 'Active'}</span>
                </div>
              </div>
            )
          })}
          className={styles.viewButton}
          aria-label="View task details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.eyeIcon}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </button>
        <button
          onClick={() => openModal({
            title: "Delete Task",
            content: (
              <div className={styles.deleteConfirmation}>
                <p className={styles.deleteMessage}>
                  Are you sure you want to delete the task "{truncate(title, 30)}"?
                  This action cannot be undone.
                </p>
              </div>
            ),
            actions: (
              <div className={styles.deleteActions}>
                <button
                  onClick={closeModal}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className={styles.confirmButton}
                >
                  Delete
                </button>
              </div>
            )
          })}
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