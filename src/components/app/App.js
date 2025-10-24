import styles from './app.module.css';
import { TodoList } from '../todoList/TodoList';


export const App = () => {
	return (
		<div className={styles['app-container']}>
			<TodoList />
		</div>
	)
};
