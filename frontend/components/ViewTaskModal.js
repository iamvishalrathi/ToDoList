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
    <div className={`${modalStyles.taskDetails} ${modalStyles.responsiveDetails}`} role="dialog" aria-label="Task details">
      <div className={modalStyles.detailRow}>
        <span className={modalStyles.detailLabel} id="title-label">Title:</span>
        <span className={`${modalStyles.detailValue} ${modalStyles.titleValue}`} aria-labelledby="title-label">{title}</span>
      </div>
      
      <div className={modalStyles.detailRow}>
        <span className={modalStyles.detailLabel} id="description-label">Description:</span>
        <div className={`${modalStyles.detailValue} ${modalStyles.descriptionValue}`} aria-labelledby="description-label">
          {description || 'None'}
        </div>
      </div>
      
      <div className={modalStyles.detailRow}>
        <span className={modalStyles.detailLabel} id="priority-label">Priority:</span>
        <span 
          className={`${modalStyles.detailValue} ${taskStyles.priority} ${taskStyles[priority]}`}
          aria-labelledby="priority-label"
        >
          {priority}
        </span>
      </div>
      
      <div className={modalStyles.detailRow}>
        <span className={modalStyles.detailLabel} id="duedate-label">Due Date:</span>
        <span className={modalStyles.detailValue} aria-labelledby="duedate-label">{formatDate(dueDate)}</span>
      </div>
      
      <div className={modalStyles.detailRow}>
        <span className={modalStyles.detailLabel} id="created-label">Created:</span>
        <span className={modalStyles.detailValue} aria-labelledby="created-label">{formatDate(createdAt)}</span>
      </div>
      
      <div className={modalStyles.detailRow}>
        <span className={modalStyles.detailLabel} id="status-label">Status:</span>
        <span 
          className={`${modalStyles.detailValue} ${completed ? modalStyles.statusCompleted : modalStyles.statusActive}`}
          aria-labelledby="status-label"
        >
          {completed ? 'Completed' : 'Active'}
        </span>
      </div>
    </div>
  );
};

export default ViewTaskModal;