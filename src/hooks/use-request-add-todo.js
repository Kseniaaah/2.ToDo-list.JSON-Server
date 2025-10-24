import { useState } from 'react'

export const useRequestAddTodo = ({ todos, setTodos, inputValue, setInputValue, API_URL }) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodo = () => {
		const title = inputValue.trim();

		if (!title) return;

		setIsCreating(true);

		fetch(API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title,
				completed: false,
			}),
		})
			.then((loadedData) => {
				if (!loadedData.ok) throw new Error('Ошибка добавления');
				return loadedData.json();
			})
			.then((loadedItem) => {
				setTodos((todos) => [...todos, loadedItem]);
				setInputValue('');
			})
			.catch((error) => {
				console.error('Не удалось добавить задачу', error);
			})
			.finally(() => setIsCreating(false));

	};

	return {
		isCreating,
		requestAddTodo,
	}
};
