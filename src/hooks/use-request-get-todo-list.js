import { useEffect, useState } from 'react'

export const useRequestGetTodoList = ({ todos, setTodos, API_URL }) => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
	setIsLoading(true);

	fetch(API_URL)
		.then((loadedData) => {
			if (!loadedData.ok) throw new Error('Ошибка загрузки');
			return loadedData.json();
		})
		.then((loadedList) => {
			setTodos(loadedList);
		})
		.catch((error) => console.log('Не удалось загрузить список дел', error))
		.finally(() => setIsLoading(false));
	},[]);

	return {
		isLoading,
	}
}

