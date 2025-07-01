import React from 'react';
import modalStyles from '../styles/Modal.module.css';
import taskStyles from '../styles/TaskItem.module.css';

const ViewTaskModal = ({ task, onClose, isOpen }) => {
  // Format date for display
  const formatDate = (date) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!task) return null;

  const { title, description, priority, dueDate, completed, createdAt } = task;

  return (
    <div className={modalStyles.taskDetails}>
      <div className={modalStyles.detailRow}>
        <span className={modalStyles.detailLabel}>Title:</span>
        <span className={modalStyles.detailValue}>{title}</span>
      </div>
      <div className={modalStyles.detailRow}>
        <span className={modalStyles.detailLabel}>Description:</span>
        <span className={modalStyles.detailValue}>{description || 'None'}</span>
      </div>
      <div className={modalStyles.detailRow}>
        <span className={modalStyles.detailLabel}>Priority:</span>
        <span className={`${modalStyles.detailValue} ${taskStyles.priority} ${taskStyles[priority]}`}>{priority}</span>
      </div>
      <div className={modalStyles.detailRow}>
        <span className={modalStyles.detailLabel}>Due Date:</span>
        <span className={modalStyles.detailValue}>{formatDate(dueDate)}</span>
      </div>
      <div className={modalStyles.detailRow}>
        <span className={modalStyles.detailLabel}>Created:</span>
        <span className={modalStyles.detailValue}>{formatDate(createdAt)}</span>
      </div>
      <div className={modalStyles.detailRow}>
        <span className={modalStyles.detailLabel}>Status:</span>
        <span className={modalStyles.detailValue}>{completed ? 'Completed' : 'Active'}</span>
      </div>
    </div>
  );
};

export default ViewTaskModal;