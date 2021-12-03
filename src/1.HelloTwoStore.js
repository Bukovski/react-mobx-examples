import React from 'react';
import { observer } from 'mobx-react';
import { observable, computed, action, makeObservable, makeAutoObservable, toJS } from 'mobx';



class HelloStore {
	clickedCount
	
	constructor(value = 1) {
		this.clickedCount = value;
		
		makeObservable(this, {
			clickedCount: observable,
			add: action,
			hasBeenClicked: computed,
		})
	}
	
	
	add() {
		this.clickedCount++;
	}
	
	get hasBeenClicked() {
		console.log('called');
		return this.clickedCount > 0;
	}
}

const data = new HelloStore(0);


class TodoStore {
	title;
	done;
	
	constructor() {
		this.title = "test"
		this.done = true
		
		makeAutoObservable(this)
	}
}
const todoStore = new TodoStore();



const GridRow = (props) => {
	return(
		<div>
			<h2>{ props.data.title }</h2>
			<p>{ props.data.done.toString() }</p>
		</div>
	)
}

const TodoView = observer(({ todo }) => {
// WRONG: GridRow won't pick up changes in todo.title / todo.done since it isn't an observer.
// return <GridRow data={todo} />

// CORRECT: let `TodoView` detect relevant changes in `todo`, and pass plain data down.
// return <GridRow data={{
//   title: todo.title,
//   done: todo.done
// }} />

// CORRECT: using `toJS` works as well, but being explicit is typically better.
	return <GridRow data={ toJS(todo) }/>
})




const TodoComponent = () => {
	return (
		<>
			<button onClick={ () => data.add() }>
				Click count = { data.clickedCount}
			</button>
			{
				data.hasBeenClicked
				&& <div>You have clicked the button!</div>
			}
		
			
			<TodoView todo={ todoStore }/>
		</>
	);
}

export default observer(TodoComponent);
