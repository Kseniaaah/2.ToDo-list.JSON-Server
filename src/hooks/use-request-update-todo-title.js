import { useState } from "react"

export const useRequestUpdateTodoTitle = ({ setTodos, API_URL }) => {
	const [updatingTodoId, setUpdatingTodoId] = useState(null);

	const requestUpdateTodoTitle = (id, newTitle) => {
		const title = newTitle.trim();
    	if (!title) return;

		setUpdatingTodoId(id);

		let previousTitle = "";

		setTodos(todos =>
			todos.map(todo => {
				if (todo.id !== id) return todo;
				previousTitle = todo.title;
				return { ...todo, title };
			})
		)

		fetch(`${API_URL}/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({ title }),
      	})
			.then((loadedData) => {
				if (!loadedData.ok) throw new Error('Ошибка редактирования');
			})
			.catch((error) => {
				console.error('Не удалось отредактировать дело', error);

				setTodos(todos =>
					todos.map(todo => (todo.id === id ? { ...todo, title: previousTitle } : todo))
				);
			})
			.finally(() => setUpdatingTodoId(null));
	}

	return {
		updatingTodoId,
		requestUpdateTodoTitle,
	}
}
