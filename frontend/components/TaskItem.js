import styles from '../styles/TaskItem.module.css';

const TaskItem = ({ task, onToggleCompletion, onDeleteTask }) => {
  const { id, title, completed } = task;

  return (
    <li className={`${styles.item} ${completed ? styles.completed : ''}`}>
      <div className={styles.taskContent}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleCompletion(id, completed)}
          className={styles.checkbox}
          id={`task-${id}`}
        />
        <label 
          htmlFor={`task-${id}`}
          className={`${styles.title} ${completed ? styles.titleCompleted : ''}`}
        >
          {title}
        </label>
      </div>
      <button
        onClick={() => onDeleteTask(id)}
        className={styles.deleteButton}
        aria-label="Delete task"
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;