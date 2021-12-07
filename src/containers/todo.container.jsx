import React from 'react';

import { TodoNew, TodoList } from "../components";

import { StoreProvider } from "../helpers/store-context.helper";
import TodoListStore from "../store/todo-list.store";



const todoListStore = new TodoListStore([
	"Should Writing in JS",
	"Should Writing in React",
	"Should Learn Redux",
	"Should Learn MobX",
	"Should Watch 'Blade Runner 2049'"
]);

const TodoContainer = () => {
	return (
		<StoreProvider value={ todoListStore }>
			<div className="todoList">
				<TodoNew />
				<TodoList />
			</div>
		</StoreProvider>
	);
}


export default TodoContainer;