import { useEffect } from "react";
import { useDebounce } from "use-debounce";

export const useRequestSearchTodo = ({ todos, setTodos, inputSeachValue, API_URL }) => {
	const [debouncedSearchTodo] = useDebounce(inputSeachValue, 300);

	useEffect(() => {
		fetch(API_URL)
			.then((loadedData) => {
				if (!loadedData.ok) throw new Error('Ошибка загрузки');
				return loadedData.json();
			})
			.then((loadedList) => {
				const filteredList = loadedList.filter((todo) => todo.title.includes(inputSeachValue));
				setTodos(filteredList);
			})
			.catch((error) => console.log('Не удалось загрузить список дел', error))
	},[debouncedSearchTodo]);

	return {
		todos,
	}

}
