import styles from '../styles/TaskList.module.css';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleCompletion, onDeleteTask }) => {
  if (tasks.length === 0) {
    return <p className={styles.emptyMessage}>No tasks yet. Add a task to get started!</p>;
  }

  return (
    <div className={styles.listContainer}>
      <h2 className={styles.listTitle}>Your Tasks</h2>
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
    </div>
  );
};

export default TaskList;