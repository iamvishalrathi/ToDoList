import styles from '../styles/NoTasksFound.module.css';

export default function NoTasksFound() {
    return (
        <div className={styles.container}>
            <img
                src="https://assets.streamlinehq.com/image/private/w_800,h_800,ar_1/f_auto/v1/icons/tokyo-duotone/interface/interface/empty-state-to-do-list-zero-tasks-p34sqoncyvhyvro48u03gs.png?_a=DATAdtXyZAA0"
                alt="No tasks found"
                className={styles.image}
            />
            <h3 className={styles.title}>No Matching Tasks</h3>
            <p className={styles.text}>
                It looks like none of your tasks match the current filters. Try adjusting your search or filter settings.
            </p>
        </div>
    );
}
