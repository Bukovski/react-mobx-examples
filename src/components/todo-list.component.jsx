import React from 'react';
import { TodoItem } from "./index";


const todoList = [
	{ id: 1, text: 'Should Starting Writing in React', isDone: true },
	{ id: 2, text: 'Should Learn MobX', isDone: false },
	{ id: 3, text: 'Should Watch Once Piece :)', isDone: false }
];

export const TodoList = () => {
	return (
		<div className="todo-list">
			<div className="open-todos">
				<span>Open Todos</span>
				{
					todoList.map(todo =>
						<TodoItem key={`${ todo.id }-${ todo.text }`} todo={ todo } />
					)
				}
			</div>
			<div className="finished-todos">
				<span>Finished Todos</span>
				{
					todoList.map(todo =>
						<TodoItem key={`${ todo.id }-${ todo.text }`} todo={ todo } />
					)
				}
			</div>
		</div>
	)
};