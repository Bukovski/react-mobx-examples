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
					? <div>
						<input
							type="text"
							onChange={ (e) => setText(e.target.value) }
						/>
						<button onClick={ saveText }>save</button>
					</div>
					: <div>
						<span>{ todo.text }</span>
						<input
							type="checkbox"
							defaultChecked={ todo.isDone }
						/>
						<button onClick={ () => setEdit(true) }>edit</button>
						<button onClick={ () => {} }>X</button>
					</div>
			}
		</div>
	)
};
