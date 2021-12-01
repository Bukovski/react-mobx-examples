import React from 'react';
import { observable } from "mobx";
import { observer } from "mobx-react";

export const counterState = observable({
	count: 0,
});

counterState.increment = function() {
	this.count++;
};

counterState.decrement = function() {
	this.count--;
};



export const Counter = observer((props) => {
	const handleIncrement = () => { props.store.increment() };
	const handleDecrement = () => { props.store.decrement() };
	
	return (
		<div className="App">
			
			<h1>{ props.store.count }</h1>
			
			<button onClick={ handleDecrement }>-1</button>
			<button onClick={ handleIncrement }>+1</button>
		</div>
	);
})

