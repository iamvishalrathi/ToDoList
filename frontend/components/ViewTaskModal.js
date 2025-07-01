import { useEffect } from 'react';
import styles from '../styles/ViewTaskModal.module.css';

const ViewTaskModal = ({ isOpen, onClose, task }) => {
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{task.title}</h2>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.taskInfo}>
            <span className={`${styles.priority} ${styles[task.priority]}`}>
              {task.priority}
            </span>
            <div className={styles.dates}>
              {task.dueDate && (
                <p className={styles.date}>
                  <strong>Due:</strong> {formatDate(task.dueDate)}
                </p>
              )}
              {task.createdAt && (
                <p className={styles.date}>
                  <strong>Created:</strong> {formatDate(task.createdAt)}
                </p>
              )}
            </div>
          </div>
          {task.description && (
            <div className={styles.description}>
              <h3>Description</h3>
              <p>{task.description}</p>
            </div>
          )}
          <div className={styles.status}>
            <h3>Status</h3>
            <p>{task.completed ? 'Completed' : 'In Progress'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskModal;