export const useRequestUpdateTodoStatus = ({ todos, setTodos, API_URL}) => {
	const handleCheckboxChange = (id) => {
		const currentTodo = todos.find((todo) => todo.id === id);
  		if (!currentTodo) return;

		const nextTodoStatus = !currentTodo.completed;

		setTodos((todos) =>
    		todos.map((todo) =>
      			todo.id === id ? { ...todo, completed: nextTodoStatus } : todo
    		)
  		);

		fetch(`${API_URL}/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ completed: nextTodoStatus }),
  		})
			.then((loadedData) => {
				if (!loadedData.ok) throw new Error('Ошибка обновления статуса');
			})
			.catch((error) => {
				console.error('Не удалось обновить статус задания', error);

				setTodos((todos) =>
					todos.map((todo) =>
						todo.id === id ? { ...todo, completed: !nextTodoStatus } : todo
					)
				);
  			});
	}

	return {
		handleCheckboxChange,
	}
}
