import React from 'react';
import modalStyles from '../styles/Modal.module.css';

const DeleteTaskModal = ({ task, onDelete, onClose }) => {
  if (!task) return null;
  
  // Truncate text if too long
  const truncate = (text, limit = 30) =>
    text.length > limit ? text.substring(0, limit) + '...' : text;

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
  };

  return (
    <>
      <div className={modalStyles.deleteConfirmation}>
        <p className={modalStyles.deleteMessage}>
          Are you sure you want to delete the task "{truncate(task.title)}"?
          This action cannot be undone.
        </p>
      </div>
      <div className={modalStyles.deleteActions}>
        <button
          onClick={onClose}
          className={modalStyles.cancelButton}
          aria-label="Cancel delete task"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className={modalStyles.confirmButton}
          aria-label="Confirm delete task"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default DeleteTaskModal;