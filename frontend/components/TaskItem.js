import { useState } from 'react';
import styles from '../styles/TaskItem.module.css';
import Modal from './Modal';
import ViewTaskModal from './ViewTaskModal';

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
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

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
      <div className={styles.actions}>
        <button
          onClick={() => setIsViewModalOpen(true)}
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the task "${truncate(title, 10)}"?`}
      />

      {/* View Task Modal */}
      <ViewTaskModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        task={task}
      />
    </li>
  );
};

export default TaskItem;