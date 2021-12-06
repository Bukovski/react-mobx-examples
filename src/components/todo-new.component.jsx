import React, { useState } from 'react';


export const TodoNew = () => {
	const [ todo, setTodo ] = useState('');
	
	const addTodo = () => {
		setTodo('');
	};
	
	return (
		<div className="add">
			<input
				type="text"
				name="add"
				placeholder="Add item..."
				value={ todo }
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
