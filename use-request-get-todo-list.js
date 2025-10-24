import { useEffect, useState } from 'react'

export const useRequestGetTodoList = ({ todos, setTodos, API_URL }) => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
	setIsLoading(true);

	fetch(API_URL)
		.then ((loadedData) => loadedData.json())
		.then((loadedList) => {
			setTodos(loadedList);
		})
		.catch((error) => console.error('Не удалось загрузить список дел', error))
		.finally(() => setIsLoading(false));
	},[]);

	return {
		isLoading,
	}
}

