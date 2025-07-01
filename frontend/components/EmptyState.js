import styles from '../styles/EmptyState.module.css';

const EmptyState = () => {
    return (
        <div className={styles.emptyContainer}>
            <img
                src="https://assets.streamlinehq.com/image/private/w_800,h_800,ar_1/f_auto/v1/icons/tokyo-duotone/interface/interface/empty-state-to-do-list-zero-tasks-p34sqoncyvhyvro48u03gs.png?_a=DATAdtXyZAA0"
                alt="No tasks illustration"
                className={styles.emptyImage}
            />
            <h3 className={styles.emptyTitle}>No Tasks Yet</h3>
            <p className={styles.emptyText}>
                Add your first task and take control of your productivity.
            </p>
        </div>
    );
};

export default EmptyState;
