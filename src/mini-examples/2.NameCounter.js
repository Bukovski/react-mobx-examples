import React, { Fragment } from "react";
import { observer } from "mobx-react";
import { observable, action, computed } from "mobx";


export const nameStore = observable({
	firstName: 'John',
	age: 30,
	
	get nickName() {
		console.log('Generate nickName!');
		return `${ this.firstName } - ${ this.age }`;
	},
	
	increment() { this.age++ },
	decrement() { this.age-- },
}, {
	// указываем что внутренние свойства являются action
	// имена в консоли при отладке для каждого action
	nickName: computed,
	increment: action('Plus one'),
	decrement: action('Minus one'),
});


export const NameCounter = observer((props) => {
	const handleIncrement = () => { props.name.increment() };
	const handleDecrement = () => { props.name.decrement() };
	
	return (
		<Fragment>
			{ props.name.nickName }
			
			<button onClick={ handleDecrement }>-1</button>
			<button onClick={ handleIncrement }>+1</button>
		</Fragment>
	)
})