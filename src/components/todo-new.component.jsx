import React, { useState } from 'react';


export const TodoNew = () => {
	const [ todo, setTodo ] = useState('');
	
	const addTodo = () => {
		setTodo('');
	};
	
	return (
		<div className="todo-new">
			<input
				type="text"
				value={ todo }
				onChange={ (e) => setTodo(e.target.value) }
			/>
			<button onClick={ addTodo }>Add Todo</button>
		</div>
	)
};
