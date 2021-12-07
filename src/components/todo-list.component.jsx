import React from 'react';
import { observer } from "mobx-react";

import { TodoItem } from "./index";
import { useStore } from "../helpers";


export const TodoList = observer(() => {
	const todoListStore = useStore();
	
	return (
		<div className="todo-list">
			<ul className="open-todos todos align">
				<span>Open Todos</span>
				{
					todoListStore.openTodos.map(todo =>
						<TodoItem key={ todo.id } todo={ todo } />
					)
				}
			</ul>
			<ul className="finished-todos todos align">
				<span>Finished Todos</span>
				{
					todoListStore.finishedTodos.map(todo =>
						<TodoItem key={ todo.id } todo={ todo } />
					)
				}
			</ul>
		</div>
	)
});