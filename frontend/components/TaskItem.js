import { useState } from 'react';
import styles from '../styles/TaskItem.module.css';
import Modal from './Modal';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Open delete confirmation modal
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  // Close modal without deleting
  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  // Confirm deletion and close modal
  const handleConfirmDelete = () => {
    onDeleteTask(id);
    setIsDeleteModalOpen(false);
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
      <button
        onClick={handleDeleteClick}
        className={styles.deleteButton}
        aria-label="Delete task"
      >
        Delete
      </button>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the task "${truncate(title, 10)}"?`}
      />
    </li>
  );
};

export default TaskItem;