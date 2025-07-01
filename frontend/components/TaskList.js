import { useState } from 'react';
import styles from '../styles/TaskList.module.css';
import TaskItem from './TaskItem';
import Modal from './Modal';

const TaskList = ({ tasks, onToggleCompletion, onDeleteTask, onDeleteAllTasks, onToggleAllTasksCompletion }) => {
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  
  // Check if all tasks are completed
  const areAllTasksCompleted = tasks.length > 0 && tasks.every(task => task.completed);
  
  // Handle delete all confirmation
  const handleDeleteAllClick = () => {
    setIsDeleteAllModalOpen(true);
  };
  
  const handleCloseDeleteAllModal = () => {
    setIsDeleteAllModalOpen(false);
  };
  
  const handleConfirmDeleteAll = () => {
    onDeleteAllTasks();
    setIsDeleteAllModalOpen(false);
  };

  if (tasks.length === 0) {
    return <p className={styles.emptyMessage}>No tasks yet. Add a task to get started!</p>;
  }

  return (
    <div className={styles.listContainer}>
      <div className={styles.listHeader}>
        <h2 className={styles.listTitle}>Your Tasks</h2>
        <div className={styles.bulkActions}>
          <button 
            className={`${styles.bulkActionButton} ${areAllTasksCompleted ? styles.uncompleteButton : styles.completeButton}`}
            onClick={() => onToggleAllTasksCompletion(!areAllTasksCompleted)}
          >
            {areAllTasksCompleted ? 'Mark All Uncompleted' : 'Mark All Completed'}
          </button>
          <button 
            className={`${styles.bulkActionButton} ${styles.deleteAllButton}`}
            onClick={handleDeleteAllClick}
          >
            Delete All
          </button>
        </div>
      </div>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleCompletion={onToggleCompletion}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>
      
      {/* Delete All Confirmation Modal */}
      <Modal
        isOpen={isDeleteAllModalOpen}
        onClose={handleCloseDeleteAllModal}
        onConfirm={handleConfirmDeleteAll}
        title="Confirm Delete All"
        message={`Are you sure you want to delete all ${tasks.length} tasks? This action cannot be undone.`}
      />
    </div>
  );
};

export default TaskList;