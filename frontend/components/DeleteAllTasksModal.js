import React from 'react';
import modalStyles from '../styles/Modal.module.css';

const DeleteAllTasksModal = ({ taskCount, onDeleteAll, onClose }) => {
  const handleDeleteAll = () => {
    onDeleteAll();
    onClose();
  };

  return (
    <>
      <div className={modalStyles.deleteConfirmation}>
        <p className={modalStyles.deleteMessage}>
          Are you sure you want to delete all {taskCount} tasks? This action cannot be undone.
        </p>
      </div>
      <div className={modalStyles.deleteActions}>
        <button
          onClick={onClose}
          className={modalStyles.cancelButton}
          aria-label="Cancel delete all tasks"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteAll}
          className={modalStyles.confirmButton}
          aria-label="Confirm delete all tasks"
        >
          Delete All
        </button>
      </div>
    </>
  );
};

export default DeleteAllTasksModal;