import React, { useState } from 'react';
import { onEnterPress, useStore } from "../helpers";


export const TodoNew = () => {
	const todoListStore = useStore();
	
	const [ todo, setTodo ] = useState('');
	
	
	const addTodo = () => {
		todoListStore.addTodo(todo);
		
		setTodo('');
	};
	
	return (
		<div className="add">
			<input
				type="text"
				name="add"
				placeholder="Add item..."
				value={ todo }
				onKeyDown={ onEnterPress(addTodo) }
				onChange={ (e) => setTodo(e.target.value) }
			/>
				<div className="input-buttons" onClick={ addTodo }>
					<button className="add-todo">
						<i className="fas fa-plus add plus-icon"/>
					</button>
				</div>
		</div>
	)
};
