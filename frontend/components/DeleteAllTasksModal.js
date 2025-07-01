import React from 'react';
import modalStyles from '../styles/Modal.module.css';
import listStyles from '../styles/TaskList.module.css';

const DeleteAllTasksModal = ({ taskCount, onDeleteAll, onClose }) => {
  const handleDeleteAll = () => {
    onDeleteAll();
    onClose();
  };

  return (
    <>
      <div className={listStyles.deleteConfirmation}>
        <p className={listStyles.deleteMessage}>
          Are you sure you want to delete all {taskCount} tasks? This action cannot be undone.
        </p>
      </div>
      <div className={listStyles.deleteActions}>
        <button
          onClick={onClose}
          className={listStyles.cancelButton}
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteAll}
          className={listStyles.confirmButton}
        >
          Delete All
        </button>
      </div>
    </>
  );
};

export default DeleteAllTasksModal;