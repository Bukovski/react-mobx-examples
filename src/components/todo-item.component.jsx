import React, { useState } from 'react';
import { useStore, onEnterPress } from "../helpers";


export const TodoItem = (props) => {
	const { todo } = props;
	
	const todoListStore = useStore();
	
	const [ text, setText ] = useState(todo.text);
	const [ edit, setEdit ] = useState(false);
	
	const handleChange = (event) => setText(event.target.value)
	
	const saveText = () => {
		todo.updateText(text);
		
		setEdit(false);
	};
	
	return (
		<div className="todo-item">
			{
				edit
					? <li className="edit-item">
						<input
							type="text"
							onKeyDown={ onEnterPress(saveText) }
							onChange={ handleChange }
							defaultValue={ text }
						/>
						<i className="far fa-save save" onClick={ saveText }/>
					</li>
					: <li>
						<input
							type="checkbox"
							id={`todo_${ todo.id }`}
							defaultChecked={ todo.isDone }
							onChange={ todo.toggleIsDone }
						/>
						<label htmlFor={`todo_${ todo.id }`}>
							<span className="check" />
							{ todo.text }
						</label>
						<div className="todo-buttons">
							<i className="far fa-edit edit" onClick={ () => setEdit(true) }/>
							<i className="far fa-trash-alt delete" onClick={ () => todoListStore.removeTodo(todo) }/>
						</div>
					</li>
			}
		</div>
	)
};
