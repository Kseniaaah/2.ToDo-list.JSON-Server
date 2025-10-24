import { useState } from "react"

export const useRequestDeleteTodo = ({ todos, setTodos, API_URL}) => {
	const [deletedTodo, setDeletedTodo] = useState(null);

	const requestDeleteTodo = (id) => {
		setDeletedTodo(id);

		const currentTodo = todos.find((todo) => todo.id === id);

  		if (!currentTodo) {
			setDeletedTodo(null);
			return;
		}

		setTodos((todos) => todos.filter((todo) => todo.id !== id));

		fetch(`${API_URL}/${id}`, {
			method: 'DELETE',
  		})
			.then((loadedData) => {
				if (!loadedData.ok) throw new Error('Ошибка удаления');
			})
			.catch((error) => {
				console.error('Не удалось удалить задание', error);

				setTodos((todos) => [...todos, currentTodo]);

			})
			.finally(() => {
        		setDeletedTodo(null);
      		});
	}

	return {
		setDeletedTodo,
		requestDeleteTodo,
	}
}
