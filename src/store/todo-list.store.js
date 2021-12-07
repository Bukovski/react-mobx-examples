import { action, computed, makeObservable, observable } from "mobx";
import TodoItemStore from "./todo-item.store";

export default class TodoListStore {
	constructor(todos) {
		this.list = [];
		todos.forEach(this.addTodo);
		
		makeObservable(this, {
			list: observable.shallow,
			
			addTodo: action,
			removeTodo: action,
			
			finishedTodos: computed,
			openTodos: computed,
		});
	}
	
	addTodo = (text) => {
		this.list.push(new TodoItemStore(text));
	}
	
	removeTodo = (todo) => {
		const indexTodo = this.list.indexOf(todo);
		
		this.list.splice(indexTodo, 1);
	};
	
	get finishedTodos() {
		return this.list.filter(todo => todo.isDone);
	}
	
	get openTodos() {
		return this.list.filter(todo => !todo.isDone);
	}
}