import React from 'react';

import { TodoNew, TodoList } from "../components";


const TodoContainer = () => {
	return (
		<div className="todoList">
			<TodoNew />
			<TodoList />
		</div>
	);
}


export default TodoContainer;