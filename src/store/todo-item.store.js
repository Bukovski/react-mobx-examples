import { action, makeObservable, observable } from "mobx";
import { randomId } from "../helpers/random-id.helper";


export default class TodoItemStore {
	constructor(text) {
		this.text = text;
		this.isDone = false;
		this.id = randomId();
		
		makeObservable(this, {
			id: observable,
			text: observable,
			isDone: observable,
			
			toggleIsDone: action,
			updateText: action
		});
	}
	
	toggleIsDone = () => {
		this.isDone = !this.isDone
	}
	
	updateText = (text) => {
		this.text = text;
	}
}
