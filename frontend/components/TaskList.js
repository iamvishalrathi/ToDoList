import { useState } from 'react';
import styles from '../styles/TaskList.module.css';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';
import NoTasksFound from './NoTasksFound';
import { useModal } from './ModalProvider';
import DeleteAllTasksModal from './DeleteAllTasksModal';

const TaskList = ({ tasks, onToggleCompletion, onDeleteTask, onDeleteAllTasks, onToggleAllTasksCompletion, isSubmitting = false }) => {
  const { openModal, closeModal } = useModal();
  
  const [filters, setFilters] = useState({
    completed: '',
    priority: '',
    searchText: ''
  });
  const [sortBy, setSortBy] = useState('createdAt');

  // Filter and sort tasks
  const filteredAndSortedTasks = tasks
    .filter(task => {
      // Filter by completion status
      if (filters.completed !== '') {
        if (filters.completed === 'true' !== task.completed) return false;
      }
      
      // Filter by priority
      if (filters.priority && task.priority !== filters.priority) return false;
      
      // Filter by search text
      if (filters.searchText && !task.title.toLowerCase().includes(filters.searchText.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'dueDate':
          return new Date(a.dueDate || '9999') - new Date(b.dueDate || '9999');
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'createdAt':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  
  // Check if all tasks are completed
  const areAllTasksCompleted = tasks.length > 0 && tasks.every(task => task.completed);
  
  // Handle delete all
  const handleDeleteAllClick = () => {
    openModal({
      title: "Delete All Tasks",
      content: (
        <DeleteAllTasksModal 
          taskCount={tasks.length} 
          onDeleteAll={onDeleteAllTasks} 
          onClose={closeModal} 
        />
      )
    });
  };

  if (tasks.length === 0) {
    return <EmptyState />;;
  }

  return (
    <div className={styles.listContainer}>
      <div className={styles.listHeader}>
        <h2 className={styles.listTitle}>Your Tasks</h2>
        
        <div className={styles.filterSection}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.searchText}
              onChange={(e) => setFilters({ ...filters, searchText: e.target.value })}
              className={styles.searchInput}
              aria-label="Search tasks"
            />
          </div>
          
          <div className={styles.filters}>
            <select
              value={filters.completed}
              onChange={(e) => setFilters({ ...filters, completed: e.target.value })}
              className={styles.filterSelect}
              aria-label="Filter by status"
            >
              <option value="">All Status</option>
              <option value="true">Completed</option>
              <option value="false">Active</option>
            </select>
            
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className={styles.filterSelect}
              aria-label="Filter by priority"
            >
              <option value="">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.filterSelect}
              aria-label="Sort tasks"
            >
              <option value="createdAt">Sort by Created Date</option>
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>
        </div>
        
        <div className={styles.bulkActions}>
          <button 
            className={`${styles.bulkActionButton} ${areAllTasksCompleted ? styles.uncompleteButton : styles.completeButton}`}
            onClick={() => onToggleAllTasksCompletion(!areAllTasksCompleted)}
            aria-label={areAllTasksCompleted ? 'Mark all tasks as uncompleted' : 'Mark all tasks as completed'}
          >
            {areAllTasksCompleted ? 'Mark All Uncompleted' : 'Mark All Completed'}
          </button>
          <button 
            className={`${styles.bulkActionButton} ${styles.deleteAllButton}`}
            onClick={handleDeleteAllClick}
            aria-label="Delete all tasks"
          >
            Delete All
          </button>
        </div>
      </div>
      
      {filteredAndSortedTasks.length === 0 ? (
        <NoTasksFound />
      ) : (
        <ul className={styles.list} role="list" aria-label="Task list">
          {filteredAndSortedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleCompletion={onToggleCompletion}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;