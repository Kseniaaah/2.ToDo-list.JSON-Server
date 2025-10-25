import { useState } from 'react';
import styles from './todoList.module.css';
import {
	useRequestAddTodo,
	useRequestGetTodoList,
	useRequestUpdateTodoStatus,
	useRequestDeleteTodo,
	useRequestUpdateTodoTitle,
	useRequestSearchTodo
} from '../../hooks'
import { EditTodoModal } from '../modal/EditTodoModal';

const API_URL = 'http://localhost:3005/todos';

export const TodoList = () => {
	const [todos, setTodos] = useState([]);

	const [inputValue, setInputValue] = useState('');
	const [inputSeachValue, setInputSearchValue] = useState('');

	const [isEditing, setIsEditing] = useState(false);
	const [editTodoId, setEditTodoId] = useState(null);
	const [editDraft, setEditDraft] = useState('');


	const [isSorted, setIsSorted] = useState(false);

	const { isLoading } = useRequestGetTodoList({ setTodos, API_URL});

	const { isCreating, requestAddTodo } = useRequestAddTodo({ setTodos, inputValue, setInputValue, API_URL} );

	const { handleCheckboxChange } = useRequestUpdateTodoStatus( { todos, setTodos, API_URL } );

	const { deletedTodo, requestDeleteTodo } = useRequestDeleteTodo({ todos, setTodos, API_URL });

	const { updatingTodoId, requestUpdateTodoTitle } = useRequestUpdateTodoTitle({ setTodos, API_URL});

	const { filteredTodos } = useRequestSearchTodo({ todos, setTodos, inputSeachValue, API_URL });
	

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleSearchInputChange = (event) => {
		setInputSearchValue(event.target.value);
	};

	const openEditModal = (id, title) => {
		setEditTodoId(id);
		setEditDraft(title);
		setIsEditing(true);
	};

	const closeEditModal = () => {
		setIsEditing(false);
		setEditTodoId(null);
		setEditDraft('');
	};

	const saveEditedTitle = () => {
		if (!editDraft.trim()) return;
		requestUpdateTodoTitle(editTodoId, editDraft);
		closeEditModal();
	};

    const toggleSortTodos = () => {
  		setIsSorted((isSorted) => !isSorted);
	};

	const displayedTodos = isSorted
  		? [...todos].sort((a, b) => a.title.localeCompare(b.title))
  		: todos;

	return (
		<div className={styles.listContainer}>
			<h3 className={styles.listHeading}>Список дел</h3>

			<div className={styles.todoTextInputContainer}>
				<input
					className={styles.todoTextInput}
					placeholder='Введите новое дело'
					type="text"
					value={inputValue}
					onChange={handleInputChange}
      			/>

				<div className={styles.todoTextInputButtonsContainer}>
					<button
						className={styles.addItemButton}
						onClick={requestAddTodo}
						disabled={isCreating || inputValue.trim() === ''}
					>
						{isCreating ? 'Добавляем…' : 'Добавить дело'}
					</button>

					<button
						className={styles.sortButton}
						onClick={toggleSortTodos}
						title={isSorted ? 'Выключить сортировку' : 'Включить сортировку по алфавиту'}
					>
						<span className={styles.sortButtonIcon}></span>
					</button>
				</div>
			</div>

			<input
				className={styles.todoSearchInput}
				placeholder='Поиск дел'
				type="text"
				value={inputSeachValue}
				onChange={handleSearchInputChange}
      		/>

			{isLoading
				? <div className={styles.loader}></div>
				: <ul className={styles.list}>
					{displayedTodos.map(({ id, title, completed }) => (
						<li key={id} className={styles.listItem}>
							<div className={styles.todoTitleContainer}>
								<input
									id={id}
									className={styles.listInput}
									type="checkbox"
									checked={completed}
									onChange={() => handleCheckboxChange(id)}>
								</input>

								<label htmlFor={id}>{title}</label>
							</div>

							<div className={styles.todoButtonsContainer}>
								<button
									className={styles.editButton}
									onClick={() => openEditModal(id, title)}
									title="Редактировать дело"
									disabled={updatingTodoId === id}
								>
									<span className={styles.todoEditIcon}></span>
								</button>

								<button
									className={styles.deleteButton}
									onClick={() => requestDeleteTodo(id)}
									title="Удалить дело"
									disabled={deletedTodo === id}
								>
									<span className={styles.todoDeleteIcon}></span>
								</button>
							</div>
						</li>
					))}
				</ul>
			}

			<EditTodoModal
				isOpen={isEditing}
				value={editDraft}
				onChange={setEditDraft}
				onSave={saveEditedTitle}
				onClose={closeEditModal}
				loading={updatingTodoId === editTodoId}
			/>
		</div>
	);
};
