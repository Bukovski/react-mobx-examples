import React from 'react';
import { TodoItem } from "./index";
import { useStore } from "../helpers/store-context.helper";


export const TodoList = () => {
	const todoList = useStore();
	
	return (
		<div className="todo-list">
			<ul className="open-todos todos align">
				<span>Open Todos</span>
				{
					todoList.openTodos.map(todo =>
						<TodoItem key={ todo.id } todo={ todo } />
					)
				}
			</ul>
			<ul className="finished-todos todos align">
				<span>Finished Todos</span>
				{
					todoList.finishedTodos.map(todo =>
						<TodoItem key={ todo.id } todo={ todo } />
					)
				}
			</ul>
		</div>
	)
};