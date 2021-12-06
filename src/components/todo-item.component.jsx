import React, { useState } from 'react';


export const TodoItem = (props) => {
	const { todo } = props;
	
	const [ text, setText ] = useState('');
	const [ edit, setEdit ] = useState(false);
	
	const saveText = () => {
		setEdit(false);
		setText('');
	};
	
	return (
		<div className="todo-item">
			{
				edit
					? <li className="edit-item">
						<input
							type="text"
							onChange={ (e) => setText(e.target.value) }
						/>
						<i className="far fa-save save" onClick={ saveText }/>
					</li>
					: <li>
						<input type="checkbox" id={`todo_${ todo.id }`} defaultChecked={ todo.isDone } />
						<label htmlFor={`todo_${ todo.id }`}>
							<span className="check" />
							{ todo.text }
						</label>
						<div className="todo-buttons">
							<i className="far fa-edit edit" onClick={ () => setEdit(true) }/>
							<i className="far fa-trash-alt delete" onClick={ () => {} }/>
						</div>
					</li>
			}
		</div>
	)
};
