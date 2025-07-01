import { useState } from 'react';
import styles from '../styles/TaskItem.module.css';
import Modal from './Modal';

const TaskItem = ({ task, onToggleCompletion, onDeleteTask }) => {
  const { id, title, description, priority, dueDate, completed } = task;

  // Format due date
  const formatDueDate = (date) => {
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
                {title}
              </label>
              <span className={`${styles.priority} ${styles[priority]}`}>
                {priority}
              </span>
            </div>
            {description && (
              <p className={styles.description}>{description}</p>
            )}
            {dueDate && (
              <p className={styles.dueDate}>
                Due: {formatDueDate(dueDate)}
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
        message={`Are you sure you want to delete the task "${title}"?`}
      />
    </li>
  );
};

export default TaskItem;